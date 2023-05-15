import { Component, Input, SimpleChanges } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ["./header.component.css"],
  styles: [`
    #header{
      width: 100%;
      position: fixed;
      top: "0";
      z-index: 100;
    }
  `]
})
export class HeaderComponent {

  //@Input() usuario: Usuario | undefined;

  usuario: string | undefined;

  constructor( private mapDataService: MapDataService ) {}

  ngOnInit(): void {
    
    this.usuario = this.mapDataService.usuario?.name;

  }

  logOut() {
    localStorage.removeItem("token");
    location.reload();
  }

}
