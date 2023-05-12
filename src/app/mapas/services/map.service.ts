import { Injectable } from '@angular/core';
import { AnySourceData, LngLat, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Record} from '../interface/punto';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interface/direction';
import { Observable, Observer, Subject, BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapa$!: Observable<Map>;
  map? : Map;
  private markers: Marker[] = [];
  private bounds: LngLatBounds = new LngLatBounds();
  private _route = new BehaviorSubject<Route>( {} as Route );
  private center: [number, number] = [-4.735524, 41.648903];
  private popupData = new Subject<LngLat>();
  private userLocation?: [number, number];

  get mapa() {
    return this.map;
  }

  get ruta() {
    return this._route.asObservable();
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
      center: coords
    } );

  }
  /** 
   * Genera un mapa mapbox
   * 
   * Método que genera el mapa de mapbox con una serie de características
   * que se le asignan y se alamcena el la variable map. La variable mapa$ 
   * se almacena como observable para ser llamado. 
   */
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

  /**
   * Genera los marcadores que se le pasan
   * 
   * Método encargado de limpiar todos los marcadores del mapa y
   * generar una nueva lista de marcadores con los puntos 
   * que le pasen como parámetros. Después crea un nuevo LngLatBounds
   * para guardar los marcadores y ajustar el zoom para todos sean 
   * visibles.
   * Si se le pasa userLocation también  creará el marcador de la 
   * posición del usuario.
   * 
   * @var newMarkers Lista con todos los marcadores generados.
   * @var newMarker Nuevo marcador generado.
   * 
   * @param puntos Lista de los puntos con los que se generarán los marcadores
   * @param userLocation Coordenadas de la posición del ususario
   */
  generarMarkers( puntos: Record[], userLocation: [number, number] |null = null) {
    let newMarkers: Marker[] = [];
    let newMarker: Marker;

    this.markers.forEach( marker => marker.remove() );

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
      padding: 20
    } )

  }
  
  /**
   * Pinta la ruta en el punto y la localización del ususario.
   * 
   * Método que borra los marcadores del mapa para mostrar los
   * puntos pasados como parámetros y realiza una llamada a la
   * base de datos para recoger la información de la ruta y 
   * pintarla.
   * 
   * @param start Coordenadas de inicio de ruta (userLocation).
   * @param end Coordenadas de final de ruta.
   */
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
        const ruta = resp.routes[0];
        this._route.next( ruta );
        this.drawPolyLine( ruta );
      } );

  }

  /** Pinta la ruta que se le pasa como parámetro.
   * 
   * Borra la ruta existente del mapa y genera una nueva
   * con los nuevos datos.
   * 
   * @constant bounds Lista con los marcadores para ajustar el zoom.
   * @constant coords Lista de coordenadas de la ruta.
   * @constant sourceData Nueva ruta creada con las coordenadas pasadas
   *  por parámetro.
   * 
   * @param route Coordenadas de la ruta a pintar
   */
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

  /**
   * Elimina la ruta con un nombre en específico
   */
  borrarRuta() {
    if( this.map?.getSource( "RouteString" ) ) {
      this.map?.removeLayer( "RouteString" )
      this.map?.removeSource( "RouteString" )
    } 
  }


  /**
   * Crea un nuevo marcador.
   * 
   * Método que genera un nuevo marcador con un popup que 
   * contiene sus coordenadas.
   * 
   * @param lnglat Coordenadas del nuevo marcador
   * @param color Color del marcador
   * @returns El marcador generado
   */
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

  /**
   * Desplaza el mapa a la localización asignada
   * 
   * 
   * 
   * 
   * @param data Coordenadas
   * @return Retorna null si data es la localización del usuario 
   */
  clickPopup( data: LngLat ) {
    /* const lnglat = [data.lat, data.lng] */
    if( data.lng == this.userLocation![1] && data.lat == this.userLocation![0] ){ return } 
    console.log(this.userLocation, data)
    this.popupData.next( data )
    this.flyTo( data );
  }

  resetRoute() {
    this._route.next( {} as Route );
  }

}
