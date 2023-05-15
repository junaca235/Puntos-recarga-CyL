import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Puntos, Record } from '../interface/punto';
import { MapService } from './map.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';

import { Observable, forkJoin, map, BehaviorSubject, catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  private _baseUrl: string = environment.jcylUrl;
  private puntos = new BehaviorSubject<Record[]>([]);
  private loadingPuntos: boolean = false;
  private userLocation: [number, number] | undefined;

  get getLocation() {
    return this.userLocation;
  }

  get getPuntos(){
    return this.puntos.asObservable();
  }

  get isLoadingPuntos() {
    return this.loadingPuntos;
  }

  get getUsuario() {
    return this.authService.getUsuario;
  }

  get getPuntosFavoritos() {
    return this.authService.getUsuario?.recordid;
  }

  constructor( private http: HttpClient,
               private mapService: MapService,
               private authService: AuthService ) { 

    this.getUserLocation();

  }

  /**
   * Recoge las coordenadas del usuario
   * 
   * Método que espera al permiso de acceso de ubucación del navegador.
   * Si se acepta el permiso se recogen las coordenadas y se genera
   * un marcador con la ubicación del usuario.
   * Si no se acepta muestra un mensaje de error.
   */
  async getUserLocation() {

    while (!this.userLocation) {
        await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    this.userLocation = [coords.longitude, coords.latitude] ;
                    this.mapService.setUserLocation([coords.latitude, coords.longitude]);
                    this.mapService.createNewMarker( this.userLocation, "green" )
                      .addTo(this.mapService.getMapa!)
                    resolve(true);
                },
                (err) => {
                    Swal.fire("Error", "No se pudo obtener la geolocalización", "error");
                    console.log(err);
                    reject();
                }
            )
        });
    }
  }

  /**
   * Devuelve los puntos filtrados y actualiza los marcadores
   * 
   * Método que realiza una llamada httpClient para recoger todos
   * los datos de los puntos.
   * Si se le pasan ambos parámetros realiza la búsqueda por
   * los filtros indicados
   * 
   * @param busqueda Nombre por el que se realiza la búsqueda
   * @param field Filtro por el que se realiza la búsqueda
   * @returns Array con los puntos obtenidos. Devuelve un array
   *          vacío si no se han encontrado puntos
   */
  chargePoints( busqueda?: string, field?: string ): Observable<Record[]>{
    let request = this._baseUrl;

    if( busqueda && field ){
      request = `${this._baseUrl}&refine.${field}=${busqueda}`;
    } 

    return this.http.get<Puntos>( request )
      .pipe(
        map(({ records }) => {

          if(records.length <= 0) throw new Error("Puntos no encontrados")
          this.actualizarPuntos(records);
          this.mapService.generarMarkers(records, this.userLocation);

          this.mapService.resetRoute();
          return records;
          
        }),
        catchError((error) => {
          console.log('Error:', error);

          return [];
        })
      );

  }

  /**
   * Recoge los puntos favoritos del ususario y actuliza los marcadores
   * 
   * Método que realiza una petición httpClient por cada punto favorito
   * y actualiza los marcadores
   */
  getFavPoints() {
    this.loadingPuntos = true;
    let points: Record[] = [];
    
    let request: Observable<Puntos>[] = [];

    this.getPuntosFavoritos?.forEach( id => {
      request.push( this.http.get<Puntos>(`${this._baseUrl}&refine.recordid=${ id }`) )
    })

    forkJoin( request )
    .subscribe( responses => {
      responses.forEach( punto => 
      points.push( punto.records[0] )
      )
        console.log("Points:", points)
        this.puntos.next(points);
      this.actualizarPuntos( points );
      this.mapService.generarMarkers( points, this.userLocation );
    } )
    
  }

  /**
   * Actualiza los puntos
   * 
   * Método que actualiza los puntos por aquellos pasados
   * por parámetro y elimina la ruta existente
   * 
   * @param puntos Array de puntos
   */
  actualizarPuntos( puntos: Record[] ) {
    this.puntos.next(puntos);
    this.mapService.borrarRuta();
    this.loadingPuntos = false;
  }

}
