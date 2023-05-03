import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  exports: [
    ButtonModule,
    OrderListModule,
    SidebarModule,
    ToastModule,
    ToolbarModule
  ]
})
export class PrimeNgModule { }
