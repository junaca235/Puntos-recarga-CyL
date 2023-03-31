import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-zoom',
  templateUrl: './barra-zoom.component.html',
  styles: [`
    #barra-zoom{
      background-color: white;
      bottom: 25px;
      left: 50px;
      padding: 10px;

      position: fixed;
      z-index: 100;
    }
  `]
})
export class BarraZoomComponent {

}
