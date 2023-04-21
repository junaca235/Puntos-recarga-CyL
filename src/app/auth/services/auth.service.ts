import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.mongoUrl;
  usuario = new Subject<AuthResponse>();

  /* get usuario() {
    return {...this._usuario.asObservable()}
  } */

  constructor( private http: HttpClient ) { }

  login( name: string, password: string ): Observable<boolean> {

    const url = `${this._baseUrl}/auth/`;
    const body = { name, password };

    return this.http.post<AuthResponse>( url , body)
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            
            localStorage.setItem("token", resp.token!);
            this.usuario.next( resp );/* {
              name: resp.name!,
              uid: resp.uid!,
            } */

          }
        } ),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }

  registro( name: string, password: string ) {

    const url = `${this._baseUrl}/auth/new`;
    const body = { name, password }

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( ({ok, token}) => {
          if( ok ) {
            localStorage.setItem("token", token!);
          }
        } ),
        map( resp => resp.ok ),
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
      tap( resp => {
        return resp
      } ),
      map( resp => resp.ok ),
      catchError( err => of(false) )
    )

  }

  /* buscarPuntos( name: string ): Observable<AuthResponse | boolean> {

    const url = `${ this._baseUrl }/searchPuntos`;
    const body = { name };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( ( usuario ) => {
          if( usuario.ok ) {
            return 
          }
        } ),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg))
      )

  } */
}
