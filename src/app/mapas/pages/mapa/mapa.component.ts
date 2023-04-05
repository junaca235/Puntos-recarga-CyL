import { Component, ElementRef, SimpleChanges, ViewChild } from '@angular/core';

import * as mapboxgl from "mapbox-gl"; //Recoge toda la librería y la llama mapboxgl
import { Record } from '../../interface/punto';
import { MapaService } from '../../services/mapa.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { catchError } from 'rxjs';
import { AuthResponse, Usuario } from 'src/app/auth/interfaces/auth.interface';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [`
    .mapa-container{
      width: 100%;
      height: 100%;
    }
  `]
})
export class MapaComponent {

  //@ViewChild("mapa") divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  puntos!: Record[];
  center: [number, number] = [-4.723, 41.6551800];
  private _usuario!: Usuario;

  get usuario() {
    return this._usuario;
  }

  constructor( private mapaService: MapaService,
               private authService: AuthService ) {}

  ngOnInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: "mapa",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 7.5,
      maxZoom: 18,
      minZoom: 4
    });

    this.mapaService.getPuntos()
      .subscribe( puntos => {
        this.puntos = puntos.records
        console.log(this.puntos)
      }
    )
          
    this.authService.validarToken().subscribe(
      resp => {
        if ( resp ) {
          this._usuario = resp as Usuario;
          console.log("Usuario: ",this._usuario)
        }
      } 
    )
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }

}
