import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { MapaComponent } from './pages/mapa/mapa.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrimeNgModule } from '../primeNg/prime-ng/prime-ng.module';
import { BarraZoomComponent } from './components/barra-zoom/barra-zoom.component';


@NgModule({
  declarations: [
    MapaComponent,
    HeaderComponent,
    MenuComponent,
    BarraZoomComponent
  ],
  imports: [
    CommonModule,
    MapasRoutingModule,
    PrimeNgModule
  ]
})
export class MapasModule { }
