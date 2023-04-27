import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Puntos, Record } from '../interface/punto';
import { MapService } from './map.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthResponse } from 'src/app/auth/interfaces/auth.interface';

import { Observable, Subject, forkJoin, map } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private _baseUrl: string = environment.jcylUrl;
  private _puntos = new Subject<Record[]>();
  private _favPoints: string[] | undefined;

  isLoadingPuntos: boolean = false;

  userLocation?: [number, number];
  datosCargados: boolean = false;

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  get puntos(){
    return this._puntos.asObservable();
  }

  get usuario() {
    return this.authService.usuario;
  }

  get favPoints() {
    return this._favPoints;
  }

  get puntosFavoritos() {
    return this.authService.usuario?.recordid;
  }

  constructor( private http: HttpClient,
               private mapService: MapService,
               private authService: AuthService ) { 

    this.getUserLocation();

   /*  this.authService.usuario
      .subscribe( usuario => {
        this._usuario = usuario;
        this._favPoints = usuario.recordid ;
      } ); */
      //this._usuario = this.authService.usuario;
      //this._favPoints = this.authService.usuario?.recordid;

  }

  async getUserLocation(): Promise<[number, number]> {

    return new Promise( ( resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          
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

  getPuntos( busqueda?: string, field?: string ): Observable<Record[]>{
    let request = this._baseUrl;

    if( busqueda && field ){
      request = `${this._baseUrl}&refine.${field}=${busqueda}`;
    } 

    return this.http.get<Puntos>( request )
      .pipe(
        map(({ records }) => {
          //this._puntos.next(records);
          this.actualizarPuntos(records);
          this.mapService.generarMarkers(records, this.userLocation!);
          return records;
        })
      );

  }

  getFavPoints() {
    this.isLoadingPuntos = true;
    let points: Record[] = [];
    
    let request: Observable<Puntos>[] = [];

    this._favPoints?.forEach( id => {
      request.push( this.http.get<Puntos>(`${this._baseUrl}&refine.recordid=${ id }`) )
    })

    forkJoin( request )
    .subscribe( responses => {
      responses.forEach( punto => 
      points.push( punto.records[0] )
      )
        console.log("Points:", points)
        this._puntos.next(points);
      this.actualizarPuntos( points );
      this.mapService.generarMarkers( points, this.userLocation! );
    } )
    
  }

  actualizarPuntos( puntos: Record[] ) {
    this.mapService.borrarRuta();
    this.isLoadingPuntos = false;
  }

}
