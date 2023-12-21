import { Component, ViewChild, ElementRef } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { Record } from '../../interface/punto';

interface filtro {
  name: string;
  value: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

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

  constructor( private mapDataService: MapDataService ) {}

  ngOnInit(): void {
    
    this.hasFavPoints = this.mapDataService.getUsuario?.recordid? true : false;
    
  }

  /**
   * Realiza la busqueda de los puntos que conicidan con la query y 
   * el filtro seleccionados.
   * 
   * Método que comprueba el tipo de filtro elegido.
   * Si es "favoritos" cargará los puntos favoritos.
   * Si query esta vacío cargará todos los puntos.
   * En cualquier otro caso hará un filtrado mediante 
   * el filtro y la query.
   */ 
  searchPoint() {

    const query = this.query.nativeElement.value.trim();
    const filtro = this.selectFiltro.nativeElement.value;
    
    if( filtro === "favoritos" ) {
      this.mapDataService.getFavPoints();
    } else if( query === "" ){
      this.mapDataService.chargePoints().subscribe();
    } else {
        this.mapDataService.chargePoints( query, filtro ).subscribe();
    }
    
    //this.query.nativeElement.value = "";

  }

}
