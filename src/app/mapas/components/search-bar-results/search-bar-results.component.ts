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

  `]
})
export class SearchBarResultsComponent {

  //@ViewChild("elementLi") elementLi!: ElementRef;
  selectedId: string = "";
  puntosFavoritos: string[] | undefined;
  puntos: Record[] = [];
  userLocation: [number, number] | undefined;

  get isLoadingPuntos() {
    return this.mapDataService.isLoadingPuntos;
  }

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

  /**
   * Centra el mapa en las coordenadas indicadas.
   * 
   * @param punto Punto del mapa donde debe centrarse
   */
  flyTo( punto: Record ){
    //const coord = punto.fields.dd.join(",");
    //this.selectedId = coord;
    this.mapService.flyTo( [punto.fields.dd[1], punto.fields.dd[0]] );
  }

  /**
   * Desplaza la lista hasta el elemento que coincida con 
   * el dato pasado.
   * 
   * Método que recoge el elemento con un id que coincida con el
   * parámetro pasado y desplaza la lista hasta mostrarlo en pantalla.
   * 
   * @param selectedId Cadena con las coordenadas del marcador seleccionado
   */
  scrollToListItem( selectedId: string ) {
    
    setTimeout(() => {//Sin el timeout no recoge el element
      const element = document.getElementById(selectedId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.selectedId = element.id;
        console.log(this.selectedId, selectedId)
      }
    }, 0);

  }

  /**
   * Muestra la ruta entre el punto seleccionado y la ubicación
   * del usuario.
   * 
   * @param punto Punto seleccionado con las coordenadas 
   * finales del trayecto.
   */
  getDirections( punto: Record ) {

    if( !this.mapDataService.getLocation ) throw Error("No se encontró la posición de inicio");

    this.mapService.getRouteBetweenPoints( this.mapDataService.getLocation , [ punto.fields.dd[1], punto.fields.dd[0] ] )

  }

  /**
   * Cambia el estado "favourite" del punto
   * 
   * Método que busca el punto en el array por su "recordid".
   * Dependiendo de si se encuentra en el array de favoritos lo
   * añadira o eliminará del array.
   * 
   * @param recordid Id del punto
   */
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

  /**
   * Cambia el valor "favourite" a true a todos los
   * puntos que se encuentren en el array de favoritos
   */
  checkFavourites() {
    this.puntos.forEach( punto => {
      if(this.puntosFavoritos?.includes(punto.recordid)) {
        punto.favourite = true;
      }
    } )
  }

  /**
   * Genera un array con el tamaño indicado.
   * 
   * @param length Tamaño del array 
   * @returns Array con la longitud indicada
   */
  arrayOf( length: string ) {
    let array: number[] = new Array();
   for (let i = 0; i < Number(length); i++) {
    array.push(i);
   }
   return array;
  }

}
