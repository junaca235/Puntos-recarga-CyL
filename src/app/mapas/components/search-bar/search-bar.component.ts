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

  filtros: filtro[] = [
    {
      name: "nombre",
      value: "name"
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

  onQueryChanged() {

    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );
    const query = this.query.nativeElement.value.trim();
    
    this.debounceTimer = setTimeout( () => {//Espera a q pase un tiempo para realizar la peticion
      
      this.mapDataService.getPuntosBy( query, this.selectFiltro.nativeElement.value );
    }, 500 );
    
    

  }

}
