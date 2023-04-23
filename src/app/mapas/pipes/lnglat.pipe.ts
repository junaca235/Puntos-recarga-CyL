import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lnglat'
})
export class LnglatPipe implements PipeTransform {

  transform(coords: number[]): [number, number] {
    return [coords[1], coords[0]];
  }

}
