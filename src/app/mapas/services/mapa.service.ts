import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import { Marcador } from '../interface/punto';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  private _baseUrl: string = "https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=puntos-de-recarga-del-vehiculo-electrico&rows=100"

  constructor(private http: HttpClient) { }

  getPuntos(): Observable<Marcador>{
    return this.http.get<Marcador>( this._baseUrl );
  }

}
