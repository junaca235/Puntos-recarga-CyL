import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SweetAlertComponent } from './sweet-alert/sweet-alert.component';



@NgModule({
  declarations: [
    SweetAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SweetAlertComponent
  ]
})
export class SharedModule { }
