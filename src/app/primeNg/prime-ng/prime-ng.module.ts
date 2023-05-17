import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  exports: [
    ButtonModule,
    SidebarModule,
    ToastModule,
    ToolbarModule
  ]
})
export class PrimeNgModule { }
