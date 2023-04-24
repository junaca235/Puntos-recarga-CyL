import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
import { Record } from '../../interface/punto';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styles: [`
    ul{
      padding: 0px
    }
    li{
      cursor: pointer;
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
  /* isFavourite: boolean = false; */
  puntosFavoritos: string[] | undefined;

  get isLoadingPuntos() {
    return this.mapDataService.isLoadingPuntos;
  }

  get puntos() {
    return this.mapDataService.puntos;
  }

  constructor( private mapDataService: MapDataService,
               private mapService: MapService,
               private authService: AuthService ) {}

  ngOnInit(): void {
    
    this.mapService.popupInfo
      .subscribe( ( data ) => {
        const coord = `${data.lat},${data.lng}`;
        this.selectedId = coord
        //console.log(`${data.lat},${data.lng}`)
        this.scrollToListItem( coord )
        //this.mapService.selectMarker( data );
      })

      this.puntosFavoritos = this.mapDataService.puntosFavoritos;
      //console.log( this.puntosFavoritos )

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

  changeFavourite( recordid: string ) {
    const punto =  this.puntos.find( punto => punto.recordid === recordid );
    
    this.authService.changeFavPoint( recordid, punto!.favourite )
      .subscribe( ok => {
        if( ok ) {
          punto!.favourite = punto!.favourite;
          //TODO: Cambiar el valor favourite del punto elegido
        }
      });

    /* this.isFavourite = !this.isFavourite; */
  }

}
