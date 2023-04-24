import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';



@NgModule({
  exports: [
    ButtonModule,
    OrderListModule,
    SidebarModule,
    ToolbarModule,
  ]
})
export class PrimeNgModule { }
