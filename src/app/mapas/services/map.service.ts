import { Injectable } from '@angular/core';
import { AnySourceData, LngLat, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Record} from '../interface/punto';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interface/direction';
import { Observable, Observer, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapa$!: Observable<Map>;
  map? : Map;
  private markers: Marker[] = [];
  private bounds: LngLatBounds = new LngLatBounds();
  private ruta: Route | undefined;
  private center: [number, number] = [-4.735524, 41.648903];
  private popupData = new Subject<LngLat>();
  private userLocation?: [number, number];

  get mapa(){
    return this.map;
  }

  get route() {
    return this.ruta;
  }

  get isMapReady() {
    return !!this.map;
  }

  get popupInfo() {
    return this.popupData.asObservable();
  }
  


  constructor( private dac: DirectionsApiClient ) {
    this.createMap();
  }


  setMap( map: Map ) {
    this.map = map;
  }

  setUserLocation( coords: [number, number] ) {
    this.userLocation = coords;
  }

  flyTo( coords: LngLatLike ) {
    
    if ( !this.isMapReady)  throw Error("El mapa no está inicializado");

    if( !this.markers.find( m => m.setLngLat( coords ) ) ){
      console.log(" Marcador no encontrado ")
      Swal.fire( "Error", "Marcador no encontrado", "error" );
    }
    //console.log( this.markers )

    this.map?.flyTo( {
      center: coords,
      zoom: 13
    } );

  }

  createMap() {

    this.mapa$ = new Observable( (observer: Observer<Map>) => {
    
      this.map = new Map({
        container: "mapaElement",
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.center,
        zoom: 7.5,
        maxZoom: 18,
        minZoom: 4
      });

      this.map.on("load", () => {
        observer.next( this.map! );
        observer.complete;
      })
      
    })
  }

  generarMarkers( puntos: Record[], userLocation: [number, number] |null = null) {

    this.markers.forEach( marker => marker.remove() );
    const newMarkers: Marker[] = [];
    let newMarker: Marker;

    if( !this.map ) throw new Error("Mapa aún no inicializado");

    puntos.forEach( punto => {

      const coords = punto.fields.dd;
      newMarker = this.createNewMarker([coords[1], coords[0]] )
        .addTo(this.map!)

        newMarkers.push( newMarker );
      
    })

    
    this.markers = newMarkers;

    this.bounds = new LngLatBounds();

    if( userLocation) {
      newMarker = this.createNewMarker( userLocation, "green" )
      .addTo(this.map!);

      this.bounds.extend( userLocation )
    } 
    

    this.markers.forEach( marker => {
      this.bounds.extend( marker.getLngLat() )
    } )

    this.map.fitBounds( this.bounds, {
      padding: 50
    } )

  }

  getRouteBetweenPoints( start: [number, number], end: [number, number] ) {

    this.markers.forEach( marker => marker.remove() );

    let newMarker = this.createNewMarker( end )
    .addTo(this.map!);
    this.markers.push( newMarker );

    newMarker = this.createNewMarker( start, "green" )
    .addTo(this.map!);
    this.markers.push( newMarker );

    this.dac.get<DirectionsResponse>(`/${ start.join("%2C") }%3B${ end.join("%2C") }`)
      .subscribe( resp => {
        console.log( resp )
        this.ruta = resp.routes[0];
          this.drawPolyLine( resp.routes[0] )
      } );

  }

  private drawPolyLine( route: Route ) {
    console.log( { km: route.distance / 1000 } );

    const bounds = new LngLatBounds();
    const coords = route.geometry.coordinates;

    coords.forEach( ([ lng, lat ]) => {
      bounds.extend( [lng, lat] );
    } );

    this.map?.fitBounds( bounds, {
      padding: 100
    } );
    
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords
            }
          }
        ]
      }
    }
    
    this.borrarRuta();
     
    this.map?.addSource( "RouteString", sourceData );

    this.map?.addLayer({
      id:"RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round"
      },
      paint: {
        "line-color": "lightgreen",
        "line-width": 3
      }
    });

  }

  borrarRuta() {
    if( this.map?.getSource( "RouteString" ) ) {
      this.map?.removeLayer( "RouteString" )
      this.map?.removeSource( "RouteString" )
    } 
  }

  createNewMarker( lnglat: [number, number], color?: string ): Marker {

    const popup = new Popup()
      .on("open", () => {

        const coords = popup.getLngLat();
        this.clickPopup( coords );

      });

    const newMarker = new Marker({
      color
    })
    .setLngLat( lnglat )
    .setPopup( popup );
    
    return newMarker;
  }

  clickPopup( data: LngLat ) {
    /* const lnglat = [data.lat, data.lng] */
    if( data.toArray() == this.userLocation ){ return } 
    console.log(this.userLocation, data)
    this.popupData.next( data )
    this.flyTo( data );
  }

  /* selectMarker( coords: LngLat ): LngLat {
    return coords
  } */


}
