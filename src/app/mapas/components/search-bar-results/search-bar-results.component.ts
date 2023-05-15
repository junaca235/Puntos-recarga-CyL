import { Component, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { MapService } from '../../services/map.service';
import { Record } from '../../interface/punto';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-search-bar-results',
  templateUrl: './search-bar-results.component.html',
  styleUrls: ["./search-bar-results.component.css"],
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
  userLocation: [number, number] | undefined;

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
    
    this.mapService.getPopupData
      .subscribe( ( data ) => {
        const coord = `${data.lat},${data.lng}`;
        this.selectedId = coord
        //console.log(`${data.lat},${data.lng}`)
        this.scrollToListItem( coord );
      })
    this.userLocation = this.mapDataService.getLocation;

      /* this.mapDataService.getPuntos()
        .subscribe( puntos => {
          this.puntos = puntos
          console.log("puntos actualizados")
         } ); */
         //this.mapDataService.getPuntos()
        
        
      this.puntosFavoritos = this.mapDataService.getPuntosFavoritos;
      this.mapDataService.getPuntos
        .subscribe( puntos => {
          this.puntos = puntos
          if( this.puntosFavoritos ) {
            this.checkFavourites();
          }
        } );

  }


  flyTo( punto: Record ){
    const coord = punto.fields.dd.join(",");
    this.selectedId = coord;
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

    if( !this.mapDataService.getLocation ) throw Error("No se encontró la posición de inicio");

    this.mapService.getRouteBetweenPoints( this.mapDataService.getLocation , [ punto.fields.dd[1], punto.fields.dd[0] ] )

  }

  changeFavourite( recordid: string ) {
    let punto =  this.puntos.find( punto => punto.recordid === recordid );
    
    this.authService.changeFavPoint( recordid, punto!.favourite )
      .subscribe( ok => {
        
        if( ok ) {
          punto!.favourite = !punto!.favourite!;
          const puntoId = punto!.recordid;
          if(this.puntosFavoritos?.includes(punto!.recordid)){
            this.mapDataService.getUsuario.recordid = this.mapDataService.getUsuario.recordid?.filter(punto => punto !== puntoId)
          } else {
            this.mapDataService.getUsuario.recordid?.push(puntoId)
          }
          this.puntosFavoritos = this.mapDataService.getUsuario.recordid;
          //this.puntosFavoritos = this.mapDataService.puntosFavoritos;
          console.log(this.puntosFavoritos, punto?.favourite)
        }
      });

  }

  checkFavourites() {
    this.puntos.forEach( punto => {
      if(this.puntosFavoritos?.includes(punto.recordid)) {
        punto.favourite = true;
      }
    } )
  }

}
