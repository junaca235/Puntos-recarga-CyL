import { Component } from '@angular/core';

import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ["./menu.component.css"],
  styles: [`

  `]
})
export class MenuComponent {

  sidebarVisible: boolean = false;


  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    
    this.mapService.popupInfo
      .subscribe( ( data ) => {
        this.sidebarVisible = true;
        //this.mapService.selectMarker( data );
      })

  }

}
