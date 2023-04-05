import { Component, Input, SimpleChanges } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';

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

  @Input() usuario: Usuario | undefined;

  ngOnInit(): void {
    
    console.log("Header: ", this.usuario)

  }

  //TODO: Eliminar el token en la parte de AUTH.SERVICE
  logOut() {
    localStorage.removeItem("token");
  }

}
