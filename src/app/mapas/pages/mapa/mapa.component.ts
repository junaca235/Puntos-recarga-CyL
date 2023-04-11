import { Component, ChangeDetectorRef } from '@angular/core';

import * as mapboxgl from "mapbox-gl"; //Recoge toda la librería y la llama mapboxgl
import { Record } from '../../interface/punto';
import { AuthService } from 'src/app/auth/services/auth.service';
import {  Usuario } from 'src/app/auth/interfaces/auth.interface';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';

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

  mapa!: mapboxgl.Map;
  puntos!: Record[];
  center: [number, number] = [-4.723, 41.6551800];
  private _usuario!: Usuario;

  //@ViewChild('mapElement') mapElement!: ElementRef

  /* get Mapa() {
    return this.mapa;
  } */

  get usuario() {
    return this._usuario;
  }

  get isMapaReady(): boolean {
    return !!this.mapa;
  }

  constructor( private mapDataService: MapDataService,
               private mapService: MapService,
               private authService: AuthService,
               private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
          
    this.authService.validarToken().subscribe(
      resp => {
        if ( resp ) {
          this._usuario = resp as Usuario;
          console.log("Usuario: ",this._usuario)
        }
      } 
    )
    
  }

  ngAfterViewInit(): void {

    //if ( !this.mapDataService.userLocation ) throw Error('No hay placesService.userLocation');
    
    this.mapa = new mapboxgl.Map({
      container: "mapaElement",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 7.5,
      maxZoom: 18,
      minZoom: 4
    });
    console.log(this.mapDataService.userLocation)

    /* this.mapDataService.getPuntos()
      .subscribe( puntos => {
        this.puntos = puntos.records
        //console.log(this.puntos)
      }
    ) */

    //Botón para centrar en la posición del usuario
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        }), "bottom-right"
    )

    new mapboxgl.Marker({
      color: "green"
    })
    .setLngLat( this.mapDataService.userLocation || this.center )
    .addTo( this.mapa );

    this.cdr.detectChanges();
    
    this.mapService.setMap( this.mapa );

  }

}
