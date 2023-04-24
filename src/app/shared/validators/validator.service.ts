import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  camposIguales(campo1: string, campo2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1 = formGroup.get( campo1 )?.value;
      const pass2 = formGroup.get( campo2 )?.value;

      if( pass1 !== pass2 ){
        formGroup.get("campo")?.setErrors({ noIgulaes: true })
        return { noIguales: true }
      }


      formGroup.get("campo")?.setErrors({ noIgulaes: null })

      return null;
    } 
  }

}