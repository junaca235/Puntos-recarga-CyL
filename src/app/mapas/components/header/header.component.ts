import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { MapDataService } from '../../services/mapData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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

  constructor( private router: Router,
               private mapDataService: MapDataService ) {}

  ngOnInit(): void {
    
    this.usuario = this.mapDataService.usuario?.name;

  }

  logOut() {
    localStorage.removeItem("token");
    location.reload();
  }

}
