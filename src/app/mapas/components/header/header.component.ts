import { Component, Input, SimpleChanges } from '@angular/core';
import { MapDataService } from '../../services/mapData.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthResponse, Usuario } from 'src/app/auth/interfaces/auth.interface';

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

  @Input() usuario: AuthResponse | undefined;

  /**
   * Elimina el token del LocalStorage y recarga la página
   */
  logOut() {
    localStorage.removeItem("token");
    location.reload();
  }

}
