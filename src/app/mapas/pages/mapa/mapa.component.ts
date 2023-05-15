import { Component } from '@angular/core';

import * as mapboxgl from "mapbox-gl"; //Recoge toda la librería y la llama mapboxgl
import { AuthResponse, Usuario } from 'src/app/auth/interfaces/auth.interface';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
import { Route } from '../../interface/direction';
import { AuthService } from 'src/app/auth/services/auth.service';

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
  private _usuario!: AuthResponse;
  userLocation: [number, number] | undefined;
  ruta: Route | undefined;

  get usuario() {
    return this._usuario;
  }

  get isMapaReady(): boolean {
    return !!this.mapa;
  }

  constructor( private mapDataService: MapDataService,
               private mapService: MapService,
               private authService: AuthService ) { }

    ngOnInit(): void {
      
      this.userLocation = this.mapDataService.userLocation;
      this.mapService.ruta.subscribe(
        ruta => this.ruta = ruta
      );
      
      this.authService.validarToken().subscribe(
        ( resp ) => {
          this._usuario = resp as AuthResponse; 
        }
      );

    }

  ngAfterViewInit(): void {

    this.mapService.mapa$
      .subscribe( () => {
        this.mapDataService.getPuntos().subscribe();
        this.userLocation = this.mapDataService.userLocation;
        this.mapService.mapa?.setCenter( this.userLocation || this.mapService.mapa.getCenter() );

      } )

  }

}
