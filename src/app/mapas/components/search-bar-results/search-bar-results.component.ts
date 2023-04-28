import { Component, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
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
  puntosFavoritos: string[] | undefined;
  puntos: Record[] = [];

  get isLoadingPuntos() {
    return this.mapDataService.isLoadingPuntos;
  }

  /* get puntos() {
    return this.mapDataService.puntos;
  } */

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

      /* this.mapDataService.getPuntos()
        .subscribe( puntos => {
          this.puntos = puntos
          console.log("puntos actualizados")
         } ); */
         //this.mapDataService.getPuntos()
        
        
      this.puntosFavoritos = this.mapDataService.puntosFavoritos;
      this.mapDataService.puntos
        .subscribe( puntos => {
          this.puntos = puntos
          if( this.puntosFavoritos ) {
            this.checkFavourites();
          }
        } );

      //console.log( this.puntosFavoritos )

  }

  ngOnDestroy(): void {
    


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
        console.log(ok)
        if( ok ) {
          punto!.favourite = !punto!.favourite!;
          const puntoId = punto!.recordid;
          //TODO: Cambiar el valor favourite del punto elegido
          if(this.puntosFavoritos?.includes(punto!.recordid)){
            this.puntosFavoritos = this.puntosFavoritos.filter(punto => punto !== puntoId)
          } else {
            this.puntosFavoritos?.push(puntoId)
          }
          //this.puntosFavoritos = this.mapDataService.puntosFavoritos;
          console.log(this.puntosFavoritos)
        }
      });

    /* this.isFavourite = !this.isFavourite; */
  }

  checkFavourites() {
    this.puntos.forEach( punto => {
      if(this.puntosFavoritos?.includes(punto.recordid)) {
        punto.favourite = true;
      }
    } )
  }

}
