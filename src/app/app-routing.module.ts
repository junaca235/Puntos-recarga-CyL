import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "mapas",
    loadChildren: () => import( "./mapas/mapas.module" )
      .then( m => m.MapasModule )
  },
  {
    path: "auth",
    loadChildren: () => import( "./auth/auth.module" )
      .then( m => m.AuthModule )
  },
  {
    path: "**",
    redirectTo: "mapas"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
