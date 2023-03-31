import { Component } from '@angular/core';

import * as mapboxgl from "mapbox-gl"; //Recoge toda la librería y la llama mapboxgl

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

  map!: mapboxgl.Map;

  constructor() {}

  ngOnInit(): void {
    
    this.map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.723, 41.6551800],
      zoom: 7.5,
    });


    
  }

}
