import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform( distancia: number): number {
    
  return  distancia / 1000;

  }

}