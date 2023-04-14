import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Puntos, Record } from '../interface/punto';
import Swal from 'sweetalert2';
import { MapService } from './map.service';
import { DirectionsResponse } from '../interface/direction';
import { DirectionsApiClient } from '../api';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private _baseUrl: string = "https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=puntos-de-recarga-del-vehiculo-electrico&rows=123";
  private _puntos!: Record[];

  isLoadingPuntos: boolean = false;

  userLocation?: [number, number];
  datosCargados: boolean = false;

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  get puntos(){
    return this._puntos;
  }

  constructor( private http: HttpClient,
               private mapService: MapService,
               private dac: DirectionsApiClient ) { 
    this.getUserLocation();
    this.getPuntos().subscribe( ( puntos ) => {
      this._puntos = puntos.records;
    } );
  }

  async getUserLocation(): Promise<[number, number]> {

    return new Promise( ( resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          console.log( coords )
          this.mapService.setUserLocation( [coords.latitude, coords.longitude] );
          resolve( this.userLocation );
        },
          ( err ) => {
            Swal.fire( "Error", "No se pudo obtener la geolocalización", "error" );
            console.log( err );
            reject();
          }
      )

    } )

  }

  getPuntos(): Observable<Puntos>{
    return this.http.get<Puntos>( this._baseUrl );
  }

  getPuntosBy( busqueda: string, field: string ) {
    this.isLoadingPuntos = true;

    this.http.get<Puntos>(`${this._baseUrl}&refine.${field}=${busqueda}`)
      .subscribe( ( puntos ) => {
        this.actualizarPuntos( puntos.records );
        this.mapService.generarMarkers( this._puntos, this.userLocation! );
      })
  }

  /* getDirectionRoute(start: [number, number], end: [number, number]) {
    return this.dac.get<DirectionsResponse>(`/${ start.join("%2C") }%3B${ end.join("%2C") }`);
  } */

  actualizarPuntos( puntos: Record[] ) {
    this.mapService.borrarRuta();
    this._puntos = puntos;
    this.isLoadingPuntos = false;
  }

}
