import { Component } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Route } from '../../interface/direction';

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.css']
})
export class RouteInfoComponent {

  sidebarVisible: boolean = false;
  ruta!: Route;

  constructor( private mapService: MapService ) {}

  ngOnInit(): void {
    
    this.mapService.getRuta
      .subscribe(
        ruta => this.ruta = ruta
      )

  }

}
