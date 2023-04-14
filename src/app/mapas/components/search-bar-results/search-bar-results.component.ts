import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild("elementLi") elementLi!: ElementRef;
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
    
    this.mapService.popupInfo
      .subscribe( ( data ) => {
        const coord = `${data.lat},${data.lng}`;
        this.selectedId = coord
        //console.log(`${data.lat},${data.lng}`)
        this.scrollToListItem( coord )
        //this.mapService.selectMarker( data );
      })

  }

  flyTo( punto: Record ){
    const coord = punto.fields.dd.join(",");
    this.selectedId = coord;//TODO: cambiar por el pipe lnglat
    this.mapService.flyTo( [punto.fields.dd[1], punto.fields.dd[0]] );
  }

  scrollToListItem( selectedId: string ) {
    
    setTimeout(() => {//Sin el timeout no recoge el element
      const element = document.getElementById(selectedId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);

  }

  getDirections( punto: Record ) {

    if( !this.mapDataService.userLocation ) throw Error("No se encontró la posición de inicio");

    this.mapService.getRouteBetweenPoints( this.mapDataService.userLocation , [ punto.fields.dd[1], punto.fields.dd[0] ] )

  }

  changeFavourite() {
    this.isFavourite = !this.isFavourite;
  }

}
