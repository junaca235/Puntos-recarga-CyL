import { Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from "mapbox-gl"; //Recoge toda la librería y la llama mapboxgl
import { Record } from '../../interface/punto';
import { MapaService } from '../../services/mapa.service';

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

  //@ViewChild("mapa") divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  puntos!: Record[];
  center: [number, number] = [-4.723, 41.6551800];

  constructor( private mapaService: MapaService ) {}

  ngOnInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: "mapa",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 7.5,
      maxZoom: 18,
      minZoom: 4
    });

    this.mapaService.getPuntos()
      .subscribe( puntos => {
        this.puntos = puntos.records
        console.log(this.puntos)
      })

    
  }

}
