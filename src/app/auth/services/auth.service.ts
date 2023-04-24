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
    return this._usuario.subscribe()
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
            this.usuario.next( resp );
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

    const url = `${ this._baseUrl }/auth/newPunto`;
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

  changeFavPoint( recordid: string, isfavourite: boolean ) {

    let url = `${ this._baseUrl }/auth/`;

    if( isfavourite ) url += "deletePunto";
    else url += "newPunto";

    console.log( url )
    //TODO: Cambiar por el nombre del usuario actual
    const body = { name: "Test1", recordid}

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp => resp.ok),
      map(resp => {
        console.log(resp.ok);
        return resp.ok;
      }),
      catchError(err => err.error)
    );
  }

}
