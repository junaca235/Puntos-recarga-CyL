import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SweetAlertComponent } from 'src/app/shared/sweet-alert/sweet-alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ '../../styles/shared.css' ],
  styles: [
  ]
})
export class LoginComponent {

  private miFormulario: FormGroup = this.fb.group({
    name: [ "a", [ Validators.required ] ],
    password: [ "a", [ Validators.required ] ],
  })

  get getMiFormulario() {
    return this.miFormulario;
  }

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService,
               private sweetAlert: SweetAlertComponent ) {}


  /**
   * Logea al usuario
   * 
   * Método que comprueba los datos introducidos y
   * navega a la página principal si son correctos.
   * Si no coinciden muestra una alerta informando al ususario.
   */
  login() {

    const{ name, password } = this.miFormulario.value;

    this.authService.login( name, password )
      .subscribe( ok => {
        if ( ok === true ) {
          this.router.navigateByUrl("/mapas");
        } else {
          //Muestra una alerta personalizada
          this.sweetAlert.showAlert({
            toast: false,
            title: "Error",
            text: ok+"",
            icon: "error",
            timer: 2000
          });
          this.miFormulario.reset();
        }
      } )

  }

}
