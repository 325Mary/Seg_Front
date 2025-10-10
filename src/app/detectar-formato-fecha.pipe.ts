import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'detectarFormatoFecha'
})
export class DetectarFormatoFechaPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return 'Valor nulo';

    const formatoDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/;
    const formatoYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;

    if (formatoDDMMYYYY.test(value)) {
      return 'DD/MM/AAAA';
    } else if (formatoYYYYMMDD.test(value)) {
      return 'AAAA/MM/DD';
    } else {
      return 'Formato desconocido';
    }
  }

}
