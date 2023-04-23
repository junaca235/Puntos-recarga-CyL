import { Component, Input, SimpleChanges } from '@angular/core';

import {  Map } from 'mapbox-gl';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-barra-zoom',
  templateUrl: './barra-zoom.component.html',
  styles: [`
    #barra-zoom{
      width: 350px;
      background-color: white;
      bottom: 25px;
      left: 50px;
      padding: 10px;

      position: absolute;
      z-index: 100;
    }
  `]
})
export class BarraZoomComponent {

  //@Input() mapa! : mapboxgl.Map;
  mapa!: Map;
  zoomLevel: number = 0;
  latitud: number = 0;
  longitud: number = 0;

  constructor( private mapService: MapService ) {}

  ngOnInit(): void {

    this.mapa?.on("zoom", () => {
      this.zoomLevel = this.mapa.getZoom()
    })

    this.mapa?.on("zoomend", () => {
      if( this.mapa.getZoom() > 18 ) {
        this.mapa.zoomTo( 18 );
      }
    })

    this.mapa?.on("move", () => {
      this.latitud = this.mapa.getCenter().lat;
      this.longitud = this.mapa.getCenter().lng;
    })

  }

  ngAfterViewInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( !this.mapService.isMapReady ) throw Error("El mapa aún no se ha cargado")
    
    this.mapa = this.mapService.mapa as Map;

    this.zoomLevel = this.mapa.getZoom();
    this.latitud = this.mapa.getCenter().lat;
    this.longitud = this.mapa.getCenter().lng;

    
  }

  ngOnDestroy(): void {
    //Eliminamos los Listeners
    this.mapa!.off("zoom", () => {});
    this.mapa!.off("zoomed", () => {});
    this.mapa!.off("move", () => {});

  }
  

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();

    //this.mapa.getCenter().lng
  }

  zoomCambio( valor: string ) {
    this.mapa.zoomTo( Number(valor) )
  }

}
