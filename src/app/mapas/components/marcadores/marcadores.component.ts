import { Component, Input, SimpleChanges } from '@angular/core';
import * as mapboxgl from "mapbox-gl/";

import { Record } from '../../interface/punto';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
  ]
})
export class MarcadoresComponent extends mapboxgl.Marker{

  //@Input()puntos: Record[] = []; 
  //@Input()mapa!: mapboxgl.Map;
  puntos: Record[] = []
  mapa!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  constructor( private mapDataService: MapDataService,
               private mapService: MapService ) {
    super();
  }

  ngAfterViewInit(): void {
    
    this.mapa = this.mapService.mapa as mapboxgl.Map;
    this.mapDataService.getPuntos()
      .subscribe( ( resp ) => {
        this.puntos = resp.records;
        console.log("Puntos guardados")
      } )
    
      console.log("Puntos: ", this.puntos)

    
      
  }

  ngOnChanges(changes: SimpleChanges): void {

    
    this.puntos?.forEach( punto => {

      this.marker = new mapboxgl.Marker()
        .setLngLat( [punto.fields.dd[1], punto.fields.dd[0]] )
        .addTo(this.mapa)
    })
    //let marker: mapboxgl.Marker;
    

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
