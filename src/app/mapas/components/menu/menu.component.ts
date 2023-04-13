import { Component, Input } from '@angular/core';
import {  Record } from '../../interface/punto';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    #menuButton{
      margin: auto;
      position: absolute;
      bottom: 25px;
      left: 45vw;
    }
  `]
})
export class MenuComponent {

  sidebarVisible: boolean = false;
  //puntos!: Punto;
  /* @Input()mapa!: mapboxgl.Map;
  @Input()puntos!: Record[]; */

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    
    this.mapService.popupInfo
      .subscribe( ( data ) => {
        console.log( data )
        
      })

  }

  /* irMarcador( lat: number, lng: number ) {
    console.log("Volando voy: ", lat, lng)

    this.mapa.flyTo({
      center:  [lat, lng],
      essential: true
    })
  } */

}
