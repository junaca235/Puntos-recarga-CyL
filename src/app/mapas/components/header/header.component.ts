import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
    #header{
      width: 100%;
      position: fixed;
      top: "0";
      z-index: 100;
    }
  `]
})
export class HeaderComponent {

}
