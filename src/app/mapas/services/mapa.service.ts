import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Marcador, Puntos } from '../interface/punto';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private _baseUrl: string = "https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=puntos-de-recarga-del-vehiculo-electrico&rows=123"

  /* private _puntos!: Puntos[];

  get puntos() {
    return this._puntos;
  } */

  constructor(private http: HttpClient) { }

  getPuntos(): Observable<Puntos>{
    return this.http.get<Puntos>( this._baseUrl );
  }

}
