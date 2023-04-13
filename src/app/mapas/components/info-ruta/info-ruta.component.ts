import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Route } from '../../interface/direction';

@Component({
  selector: 'app-info-ruta',
  templateUrl: './info-ruta.component.html',
  styleUrls: ['./info-ruta.component.css'],
  styles: [`
    #infoRutaButton {
      position: absolute;
      top: 50vh;
      left: 10px;
      
      margin: auto;
      z-index: 999;
    }
  `]
})
export class InfoRutaComponent {

  sidebarVisible: boolean = false;
  infoRuta: Route | undefined;
  distancia: number = 0;

  constructor( private mapService: MapService ) {}

  ngOnInit(): void {
    this.infoRuta = this.mapService.route;
    this.distancia = this.infoRuta!.distance
  }

}
