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
               private authService: AuthService ) {}


  ngAfterViewInit(): void {

    this.mapService.mapa$
      .subscribe( () => {
        this.mapDataService.getPuntos();
        const userLocation = this.mapDataService.userLocation;
        this.mapService.mapa?.setCenter( userLocation || this.mapService.mapa.getCenter() );

      } )

  }

}
