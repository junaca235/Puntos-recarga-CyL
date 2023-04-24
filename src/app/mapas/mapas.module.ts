import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapasRoutingModule } from './mapas-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { PrimeNgModule } from '../primeNg/prime-ng/prime-ng.module';
import { LoadingComponent } from './components/loading/loading.component';
import { MapaComponent } from './pages/mapa/mapa.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchBarResultsComponent } from './components/search-bar-results/search-bar-results.component';
import { LnglatPipe } from './pipes/lnglat.pipe';
import { LocationButtonComponent } from './components/location-button/location-button.component';
import { InfoRutaComponent } from './components/info-ruta/info-ruta.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
    MapaComponent,
    MenuComponent,
    SearchBarComponent,
    SearchBarResultsComponent,
    LnglatPipe,
    LocationButtonComponent,
    InfoRutaComponent,
  ],
  imports: [
    CommonModule,
    MapasRoutingModule,
    PrimeNgModule
  ]
})
export class MapasModule { }
