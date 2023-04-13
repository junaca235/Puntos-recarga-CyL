import { Component, ChangeDetectorRef } from '@angular/core';

import * as mapboxgl from "mapbox-gl"; //Recoge toda la librería y la llama mapboxgl
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
import { switchMap, tap } from 'rxjs';
import { Record } from '../../interface/punto';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [`
    .mapa-container{
      width: 100%;
      height: 100%;
    }
  `]
})
export class MapaComponent {

  private mapa!: mapboxgl.Map;
  private puntos: Record[] = [];
  private _usuario!: Usuario;

  get usuario() {
    return this._usuario;
  }

  get isMapaReady(): boolean {
    return !!this.mapa;
  }

  constructor( private mapDataService: MapDataService,
               private mapService: MapService,
               private authService: AuthService,
               /* private cdr: ChangeDetectorRef */ ) {}

  ngOnInit(): void {
    
    if( localStorage.getItem("token") ) {

      this.authService.validarToken().subscribe(
        resp => {
          if ( resp ) {
            this._usuario = resp as Usuario;
            console.log("Usuario: ",this._usuario)
          }
        } )
    }

  }

  ngAfterViewInit(): void {

    this.mapService.mapa$
      .pipe(
        switchMap( () => {
          return this.mapDataService.getPuntos()
        }),
        tap(        
        )
      )
      .subscribe(( puntos ) => {

        //this.puntos = puntos.records;
        /* puntos.records.forEach(punto => {
          this.puntos.push({
            id: punto.fields.dd.join("-"),
            punto: punto
          })
        }); */
        this.puntos = puntos.records;
      
          const userLocation = this.mapDataService.userLocation;

            this.mapService.generarMarkers( this.puntos, userLocation! )

            this.mapService.mapa?.setCenter( userLocation || this.mapService.mapa.getCenter() );
    });

    console.log(this.mapDataService.userLocation)

    //this.cdr.detectChanges();
  }

}
