import { Component, HostListener, Input } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

import { Puntos, Record, Marcador } from '../../interface/punto';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
  ]
})
export class MarcadoresComponent extends mapboxgl.Marker{

  @Input()puntos: Record[] = []; 
  @Input()mapa!: mapboxgl.Map;

  marker!: mapboxgl.Marker;

  ngOnChanges(): void {
    console.log(this.puntos);

    //let marker: mapboxgl.Marker;
    
    this.puntos?.forEach( punto => {

      this.marker = new mapboxgl.Marker()
        .setLngLat( [punto.fields.dd[1], punto.fields.dd[0]] )
        .addTo(this.mapa)
    })

    //TODO: Comprobar que se pulsa un marker
    this.mapa.on("click", ( event ) => {
      //if( event.originalEvent.target === this.marker.getElement() ){
        this.mapa.flyTo({
          center: event.lngLat
        })
      //}

        //TODO: Mostrar la info del punto seleccionado en el menu
    })
  
  }

}
