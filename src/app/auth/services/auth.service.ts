import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return {...this._usuario}
  }

  constructor( private http: HttpClient ) { }

  login( name: string, password: string ): Observable<boolean> {

    const url = `${this._baseUrl}/auth/`;
    const body = { name, password };

    return this.http.post<AuthResponse>( url , body)
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            
            localStorage.setItem("token", resp.token!);
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
            }

          }
        } ),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  registro( name: string, password: string ) {

    const url = `${this._baseUrl}/auth/new`;
    const body = { name, password }

    return this.http.post( url, body )
      .pipe(
        tap( resp => {
          console.log(resp)
          /* if( ok ) {
            localStorage.setItem("token", token!);
          } */
        } ),
        map( resp => resp ),
        catchError( err => of(err.error.msg))
      )

  }

  logOut() {
    localStorage.removeItem("token");
  }

  /**
   * Comprueba si el token almacenado en localStorage coinside con un usuario
   * 
   * @return El usuario si lo ha encontrado. False en caso contrario.
   */
  validarToken(): Observable<AuthResponse | boolean> {

    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set("x-token", localStorage.getItem("token") || "");

    return this.http.get<AuthResponse>( url , { headers } )
    .pipe(
      map( resp => {
        return resp
      } ),
      catchError( err => of(false) )
    )

  }
}
