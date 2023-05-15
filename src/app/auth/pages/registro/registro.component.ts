import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent {

  miFormulario: FormGroup = this.fb.group({
    name: [ "", [ Validators.required ] ],
    password: [ "", [ Validators.required, Validators.minLength(6) ] ],
    confirmar: [ "", [ Validators.required ] ],
  },
  {
    validators: [ this.authService.camposIguales( "password", "confirmar" ) ]
  });

  constructor( private fb: FormBuilder,
               private authService: AuthService ) {}

  registro() {

    const { name, password } = this.miFormulario.value;

    this.authService.registro(name, password)
      .subscribe( ok => {
        if ( ok === true ) {
          Swal.fire( "Guardado", "Usuario registrado", "success" );
        } else {
          //Muestra una alerta personalizada
          Swal.fire( "Error", ok, "error" );
        }
      })

  }

}
