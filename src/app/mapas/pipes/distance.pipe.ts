import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  /**
   * Devuelve el valor en la magnitud indicada
   * 
   * Método que converte el valor pasado como parámetro con una
   * mágnitud a otra indicada.
   * 
   * @param value Valor a convertir
   * @param from Magnitud inicial de "value"
   * @param to Magnitud final de "value"
   * @returns Conversión de "value" a la magnitud indicada
   */
  transform( value: number, from: string, to: string): number {
    
    const meterValue = this.toMeters( value, from );
    return this.convertFromMeters( meterValue, to );

  }

  /**
   * Convierte el valor con la magnitud en metros
   * 
   * @param value Valor a convertir
   * @param from Magnitud del valor
   * @returns "value" en metros
   */
  private toMeters(value: number, from: string): number {

    switch (from) {
      case "mm":
        return value / 1000;
      case "cm":
        return value / 100;
      case "m":
        return value;
      case "km":
        return value * 1000;
      default:
        throw new Error('Invalid "from"');
    }

  }

  /**
   * Comvierte el valor en la magnitud indicada
   * 
   * @param value Valor a convertir
   * @param to Magnitud a convertir
   * @returns "value" en la magnitud indicada
   */
  private convertFromMeters(value: number, to: string): number {

    switch (to) {
      case "mm":
        return value * 1000;
      case "cm":
        return value * 100;
      case "m":
        return value;
      case "km":
        return value / 1000;
      default:
        throw new Error('Invalid "to"');
    }

  }

}

