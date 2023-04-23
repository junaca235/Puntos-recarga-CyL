import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './pages/mapa/mapa.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path:"mapa",
        component: MapaComponent
      },
      {
        path:"**",
        redirectTo: "mapa"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
