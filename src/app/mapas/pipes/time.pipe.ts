import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimetPipe implements PipeTransform {

  /**
   * Devuelve los segundos pasados por parámetro
   * en horas y minutos
   * 
   * @param value Tiempo en segundos
   * @returns Tiempo en horas y minutos
   */
  transform( value: number): string {
    const horas = Math.floor(value / 3600);
    const minutos = Math.floor((value % 3600) / 60);

    let time: string = "";

    if(horas > 0) time += `${horas} h `;
    if(minutos > 0) time += `${minutos} min `;

    return time;
  }

}