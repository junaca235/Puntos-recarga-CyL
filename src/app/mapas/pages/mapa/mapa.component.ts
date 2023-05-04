import { Component } from '@angular/core';

import * as mapboxgl from "mapbox-gl"; //Recoge toda la librería y la llama mapboxgl
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
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
  userLocation: [number, number] | undefined;

  get usuario() {
    return this._usuario;
  }

  get isMapaReady(): boolean {
    return !!this.mapa;
  }

  constructor( private mapDataService: MapDataService,
               private mapService: MapService ) {}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.userLocation = this.mapDataService.userLocation;
    }

  ngAfterViewInit(): void {

    this.mapService.mapa$
      .subscribe( () => {
        this.mapDataService.getPuntos();
        this.userLocation = this.mapDataService.userLocation;
        this.mapService.mapa?.setCenter( this.userLocation || this.mapService.mapa.getCenter() );

      } )
    
    this.mapDataService.getPuntos().subscribe( puntos => {
      this.puntos = puntos
    });

  }

}
