import { Component } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
import { LngLatLike, Marker } from 'mapbox-gl';

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
      this.mapService.flyTo( userLocation as LngLatLike);
    } else {
      this.mapDataService.getUserLocation()
    }

  }

}
