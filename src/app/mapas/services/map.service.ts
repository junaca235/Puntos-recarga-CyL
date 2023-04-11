import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker } from 'mapbox-gl';
import { Record } from '../interface/punto';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interface/direction';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map? : Map;
  private markers: Marker[] = [];

  get mapa(){
    return this.map;
  }

  get isMapReady() {
    return !!this.map;
  }

  constructor( private dac: DirectionsApiClient ) {}

  setMap( map: Map ) {
    this.map = map;
  }

  flyTo( coords: LngLatLike ) {
    
    if ( !this.isMapReady)  throw Error("El mapa no está inicializado");

    this.map?.flyTo( {
      center: coords
    } )

  }

  generarMarkers( puntos: Record[], userLocation: [number, number]) {

    this.markers.forEach( marker => marker.remove() );
    const newMarkers: Marker[] = [];

    if( !this.map ) throw new Error("Mapa aún no inicializado");

    puntos.forEach( punto => {
      const newMarker = new Marker()
        .setLngLat( [punto.fields.dd[1], punto.fields.dd[0]] )
        .addTo(this.map!);
        newMarkers.push( newMarker );

      newMarker.getElement().addEventListener("click", (event) => {
        //TODO: Pulsar el marcador
        console.log(event)
      })
    })

    this.markers = newMarkers;

    const bounds = new LngLatBounds();
    bounds.extend( userLocation )

    this.markers.forEach( marker => {
      bounds.extend( marker.getLngLat() )
    } )

    this.map.fitBounds( bounds, {
      padding: 100
    } )
    console.log(this.markers)
  }

  getRouteBetweenPoints( start: [number, number], end: [number, number] ) {

    this.dac.get<DirectionsResponse>(`/${ start.join("%2C") }%3B${ end.join("%2C") }`)
      .subscribe( resp => {
        console.log( resp )
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
    
    if( this.map?.getSource( "RouteString" ) ) {
      this.map?.removeLayer( "RouteString" )
      this.map?.removeSource( "RouteString" )
    }  
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
        "line-color": "green",
        "line-width": 3
      }
    });

  }


}
