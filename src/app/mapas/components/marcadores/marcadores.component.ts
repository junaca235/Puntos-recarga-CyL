import { Component, Input } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

import { Puntos, Record, Marcador } from '../../interface/punto';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
  ]
})
export class MarcadoresComponent {

  @Input()puntos: Record[] = []; 
  @Input()mapa!: mapboxgl.Map; 
  marcadores = mapboxgl.Marker;

  ngOnChanges(): void {
    console.log(this.puntos);

    let marker: mapboxgl.Marker;
    
    this.puntos?.forEach( punto => {

      marker = new mapboxgl.Marker()
        .setLngLat( [punto.fields.dd[1], punto.fields.dd[0]] )
        .addTo(this.mapa)
    })
    
    //this.marcadores.push( marker )
  }

}
