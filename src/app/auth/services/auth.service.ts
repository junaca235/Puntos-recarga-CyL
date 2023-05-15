import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl = environment.mongoUrl;
  //private _usuario = new Subject<AuthResponse>();
  private user!: AuthResponse;

  get usuario() {
    return this.user;
  }

  constructor( private http: HttpClient ) { }

  /**
   * Verifica que los datos introducidos coinciden y logea al usuario
   * 
   * Método que comprueba si los datos coinciden en la base de datos
   * 
   * @param name 
   * @param password 
   * @returns 
   */
  login( name: string, password: string ): Observable<boolean> {

    const url = `${this._baseUrl}/auth/`;
    const body = { name, password };

    return this.http.post<AuthResponse>( url , body)
      .pipe(
        tap( resp => {
          if( resp.ok ) {
            
            localStorage.setItem("token", resp.token!);
            //this._usuario.next( resp );
            this.user = resp;
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

    const url = `${ this._baseUrl }/auth/renew`;
    const headers = new HttpHeaders()
      .set("token", localStorage.getItem("token") || "");

    return this.http.get<AuthResponse>( url , { headers } )
    .pipe(
      tap( resp => {
        console.log(resp)
        this.user = resp;
      } ),
      map( resp => resp ),
      catchError( err => of(false) )
    )

  }

  changeFavPoint( recordid: string, isfavourite: boolean ) {

    let url = `${ this._baseUrl }/auth/`;

    if( isfavourite ) url += "deletePunto";
    else url += "newPunto";

    const body = { name: this.user.name, recordid}

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      //tap(resp => resp.ok),
      map(resp => {
        return resp.ok;
      }),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }

}
