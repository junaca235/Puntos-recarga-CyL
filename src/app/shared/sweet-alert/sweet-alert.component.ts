import { Component } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';

import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-sweet-alert',
  template: '',
  styleUrls: ['./sweet-alert.component.css']
})
export class SweetAlertComponent {

  options: SweetAlertOptions = {
    title:"",
    icon: "info",
    toast: true,
    showConfirmButton: false,
    timer: 3000
  }

  showAlert(options: SweetAlertOptions): void {
    const mergedOptions: SweetAlertOptions = { ...this.options, ...options };
    Swal.fire(mergedOptions);
  }

}
