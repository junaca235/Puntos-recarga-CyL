import { Component, Input } from '@angular/core';
import { MapaService } from '../../services/mapa.service';
import {  Record } from '../../interface/punto';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    #menuButton{
      margin: auto;
      position: absolute;
      bottom: 25px;
      left: 45vw;
     /*  z-index:"100" */
    }
    #menu{
      position: absolute;
      z-index: "200"
    }
  `]
})
export class MenuComponent {

  sidebarVisible: boolean = false;
  //puntos!: Punto;
  @Input()mapa!: mapboxgl.Map;
  @Input()puntos!: Record[];

  constructor(private mapaService: MapaService) {}

  irMarcador( lat: number, lng: number ) {
    console.log("Volando voy: ", lat, lng)

    this.mapa.flyTo({
      center:  [lat, lng],
      essential: true
    })
  }

}
