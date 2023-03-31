import { Component } from '@angular/core';
import { MapaService } from '../../services/mapa.service';
import { Marcador } from '../../interface/punto';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
    #menuButton{
      margin: auto;
      position: fixed;
      bottom: 25px;
      left: 45vw;
      z-index:"100"
    }
    #menu{
      position: fixed;
      z-index: "200"
    }
  `]
})
export class MenuComponent {

  sidebarVisible: boolean = false;
  //puntos!: Punto;
  puntos: any[] = [
    {
      dms: "dms",
      tipo: "tipo",
      operador: "operador",
      dd: [12, 90],
      no: "2",
      nombre: "nombre"
    },
    {
      dms: "dms2",
      tipo: "tipo2",
      operador: "operador2",
      dd: [122, 902],
      no: "2",
      nombre: "nombre2"
    }
  ]

  constructor(private mapaService: MapaService) {}

  ngOnInit(): void {
    

    //TODO:recoger los puntos correctamente
    /* this.mapaService.getPuntos()
      .subscribe( puntos => {
        this.puntos = puntos
        console.log(this.puntos.records)
      } ) */

  }

}
