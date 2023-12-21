import { Component } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
import { LngLat } from 'mapbox-gl';

@Component({
  selector: 'app-location-button',
  templateUrl: './location-button.component.html',
  styleUrls: ['./location-button.component.css']
})
export class LocationButtonComponent {

  constructor( private mapDataService: MapDataService,
               private mapService: MapService ) {}

  /**
   * Comprueba si existe la localización del usuario y 
   * centra el mapa en ella.
   * Si no existe intenta obtenerla.
   */
  goToMyLocation() {

    const userLocation = this.mapDataService.getLocation;

    if(userLocation){
      this.mapService.flyTo( {lng: userLocation[1], lat: userLocation[0]} as LngLat);
    } else {
      this.mapDataService.getUserLocation()
    }

  }

}
