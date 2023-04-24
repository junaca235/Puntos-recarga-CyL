import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable, combineLatest, forkJoin, switchMap } from 'rxjs';
import { Puntos, Record } from '../interface/punto';
import Swal from 'sweetalert2';
import { MapService } from './map.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthResponse } from 'src/app/auth/interfaces/auth.interface';
import { waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private _baseUrl: string = environment.jcylUrl;
  private _puntos!: Record[];
  private _usuario: AuthResponse | undefined;
  private _favPoints: string[] | undefined;

  isLoadingPuntos: boolean = false;

  userLocation?: [number, number];
  datosCargados: boolean = false;

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  get puntos(){
    return this._puntos;
  }

  get usuario() {
    return this._usuario;
  }

  get favPoints() {
    return this._favPoints;
  }

  get puntosFavoritos() {
    return this._usuario?.recordid;
  }

  constructor( private http: HttpClient,
               private mapService: MapService,
               private authService: AuthService ) { 

    this.getUserLocation();

    /* this.getPuntos().subscribe( ( puntos ) => {
      this._puntos = puntos.records;
    } ); */

    this.authService.usuario
      .subscribe( usuario => {
        this._usuario = usuario;
        this._favPoints = usuario.recordid ;
      } );

  }

  async getUserLocation(): Promise<[number, number]> {

    return new Promise( ( resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          /* console.log( coords ) */
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

  getPuntos(){
    this.http.get<Puntos>( this._baseUrl )
    .subscribe( ( puntos ) => {
      this._puntos = puntos.records;
      this.actualizarPuntos( this._puntos );
      this.mapService.generarMarkers( this._puntos, this.userLocation! );
    })
  }

  getPuntosBy( busqueda: string, field: string ) {
    this.isLoadingPuntos = true;

    this.http.get<Puntos>(`${this._baseUrl}&refine.${field}=${busqueda}`)
      .subscribe( ( puntos ) => {
        this.actualizarPuntos( puntos.records );
        this.mapService.generarMarkers( this._puntos, this.userLocation! );
      })
  }

  getFavPoints() {
    this.isLoadingPuntos = true;
    this._puntos = [];
    
    let request: Observable<Puntos>[] = [];

    this._favPoints?.forEach( id => {
      request.push( this.http.get<Puntos>(`${this._baseUrl}&refine.recordid=${ id }`) )
    })

    forkJoin( request )
    .subscribe( responses => {
      responses.forEach( punto => 
      this._puntos.push( punto.records[0] )
        )

      this.actualizarPuntos( this._puntos );
      this.mapService.generarMarkers( this._puntos, this.userLocation! );
    } )
    
  }

  actualizarPuntos( puntos: Record[] ) {
    this.mapService.borrarRuta();
    this._puntos = puntos;
    this.isLoadingPuntos = false;
  }

}
