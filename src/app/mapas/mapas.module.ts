import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrimeNgModule } from '../primeNg/prime-ng/prime-ng.module';
import { BarraZoomComponent } from './components/barra-zoom/barra-zoom.component';
import { MarcadoresComponent } from './components/marcadores/marcadores.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarResultsComponent } from './components/search-bar-results/search-bar-results.component';
import { LnglatPipe } from './pipes/lnglat.pipe';


@NgModule({
  declarations: [
    BarraZoomComponent,
    HeaderComponent,
    LoadingComponent,
    MapaComponent,
    MarcadoresComponent,
    MenuComponent,
    SearchBarComponent,
    SearchBarResultsComponent,
    LnglatPipe,
  ],
  imports: [
    CommonModule,
    MapasRoutingModule,
    PrimeNgModule
  ]
})
export class MapasModule { }
