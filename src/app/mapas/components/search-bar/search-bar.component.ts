import { Component, ViewChild, ElementRef } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';

interface filtro {
  name: string;
  value: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  styles: [`
    
  `]
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout
  @ViewChild("query") query!: ElementRef 
  @ViewChild("selectFiltro") selectFiltro!: ElementRef 
  hasFavPoints: boolean = false; 

  filtros: filtro[] = [
    {
      name: "nombre",
      value: "nombre"
    },
    {
      name: "tipo",
      value: "type"
    },
    {
      name: "operador",
      value: "operador"
    },
  ]

  constructor( private mapDataService: MapDataService ) {}

  ngOnInit(): void {
    
    this.hasFavPoints = this.mapDataService.usuario?.recordid? true : false;

  }

  onQueryChanged() {

    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );
    const query = this.query.nativeElement.value.trim();
    
    this.debounceTimer = setTimeout( () => {//Espera a q pase un tiempo para realizar la peticion
      
      const filtro = this.selectFiltro.nativeElement.value;

      if( query === "" ){
        this.mapDataService.getPuntos();
      } else if( filtro === "favoritos" ) {
        this.mapDataService.getFavPoints();
      } else {
        this.mapDataService.getPuntosBy( query, filtro );
      }
  
      this.query.nativeElement.value = "";

    }, 500 );
    
    

  }

}
