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

  goToMyLocation() {

    const userLocation = this.mapDataService.userLocation;

    if(userLocation){
      this.mapService.flyTo( userLocation as LngLatLike);
    } else {
      this.mapDataService.getUserLocation()
    }

  }

}
