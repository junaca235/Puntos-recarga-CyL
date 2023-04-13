import { Component } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
import { Record } from '../../interface/punto';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styles: [`
    ul{
      padding: 0px
    }
    li{
      display:flex;
      flex-direction: row;
    }
    button:focus{
      outline: none;
    }
    button>i{
      color: lightgreen; 
    }
  `]
})
export class SearchBarResultsComponent {


  selectedId: string = "";
  isFavourite: boolean = false;

  get isLoadingPuntos() {
    return this.mapDataService.isLoadingPuntos;
  }

  get puntos() {
    return this.mapDataService.puntos;
  }

  constructor( private mapDataService: MapDataService,
               private mapService: MapService ) {}

  ngOnInit(): void {
    
    

  }

  flyTo( punto: Record ){
    this.selectedId = punto.recordid;//TODO: cambiar por el pipe lnglat
    this.mapService.flyTo( [punto.fields.dd[1], punto.fields.dd[0]] );
  }

  getDirections( punto: Record ) {

    if( !this.mapDataService.userLocation ) throw Error("No se encontró la posición de inicio");

    this.mapService.getRouteBetweenPoints( this.mapDataService.userLocation , [ punto.fields.dd[1], punto.fields.dd[0] ] )

  }

  changeFavourite() {
    this.isFavourite = !this.isFavourite;
  }

}
