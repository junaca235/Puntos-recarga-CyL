import { Component, ViewChild, ElementRef } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { Record } from '../../interface/punto';
import { MessageService } from 'primeng/api';

interface filtro {
  name: string;
  value: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [ MessageService ]
})
export class SearchBarComponent {

  //private debounceTimer?: NodeJS.Timeout
  @ViewChild("query") query!: ElementRef 
  @ViewChild("selectFiltro") selectFiltro!: ElementRef 
  hasFavPoints: boolean = false; 
  private puntos: Record[] = []

  filtros: filtro[] = [
    {
      name: "nombre",
      value: "nombre"
    },
    {
      name: "tipo",
      value: "tipo"
    },
    {
      name: "operador",
      value: "operador"
    },
  ]

  constructor( private mapDataService: MapDataService, 
               private messageService: MessageService ) {}

  ngOnInit(): void {
    
    this.hasFavPoints = this.mapDataService.usuario?.recordid? true : false;
    
  }

  searchPoint() {

    //if ( this.debounceTimer ) clearTimeout( this.debounceTimer );
    const query = this.query.nativeElement.value.trim();
    const filtro = this.selectFiltro.nativeElement.value;
    //this.debounceTimer = setTimeout( () => {//Espera a q pase un tiempo para realizar la peticion
      try {
        if( query === "" ){
          this.mapDataService.getPuntos().subscribe();
        } else if( filtro === "favoritos" ) {
          this.mapDataService.getFavPoints();
        } else {
           this.mapDataService.getPuntos( query, filtro ).subscribe();
        }
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se encontraron puntos' })
      }
    

    this.query.nativeElement.value = "";
    //}, 500 );

  }

}
