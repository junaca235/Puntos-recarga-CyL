import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Swal from 'sweetalert2';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';


if( !navigator.geolocation ) {
  Swal.fire( "Error", "El navegador no soporta la Geolocalización", "error" );
  throw new Error( "El navegador no soporta la Geolocalización" );
}

/* if( environment.production ) {
  enableProdMode();
} */

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
