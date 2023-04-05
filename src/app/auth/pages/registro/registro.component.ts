import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validators/validator.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent {

  miFormulario: FormGroup = this.fb.group({
    name: [ "test1", [ Validators.required ] ],
    password: [ "123456", [ Validators.required, Validators.minLength(6) ] ],
    confirmar: [ "123456", [ Validators.required ] ],
  },
  {
    validators: [ this.vs.camposIguales( "password", "confirmar" ) ]
  });

  constructor( private fb: FormBuilder,
               private vs: ValidatorService,
               private authService: AuthService,
               private router: Router ) {}

  registro() {

    const { name, password } = this.miFormulario.value;

    this.authService.registro(name, password)
      .subscribe( ok => {
        console.log(ok)
        if ( ok === true ) {
          this.router.navigateByUrl("/mapas");
        } else {
          //Muestra una alerta personalizada
          Swal.fire( "Error", ok+"", "error" );
        }
      })

  }

}
