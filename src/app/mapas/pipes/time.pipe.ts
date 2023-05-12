import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimetPipe implements PipeTransform {

  transform( tiempo: number): string {
    const horas = Math.floor(tiempo / 3600);
    const minutos = Math.floor((tiempo % 3600) / 60);

    let time: string = "";

    if(horas > 0) time += `${horas} h `;
    if(minutos > 0) time += `${minutos} min `;

    return time;
  }

}