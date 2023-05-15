import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  private miFormulario: FormGroup = this.fb.group({
    name: [ "", [ Validators.required ] ],
    password: [ "", [ Validators.required ] ],
  })

  get getMiFormulario() {
    return this.miFormulario;
  }

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService ) {}

  login() {

    const{ name, password } = this.miFormulario.value;

    this.authService.login( name, password )
      .subscribe( ok => {
        if ( ok === true ) {
          this.router.navigateByUrl("/mapas");
        } else {
          //Muestra una alerta personalizada
          Swal.fire( "Error", ok+"", "error" );
          this.miFormulario.reset();
        }
      } )

  }

}
