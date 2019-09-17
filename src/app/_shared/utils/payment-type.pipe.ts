import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentType',
})
export class PaymentTypePipe implements PipeTransform {
  transform(value: string): string {
    if (value.toLocaleLowerCase() === 'mm') {
      return 'mobile money';
    } else {
      return value;
    }
  }
}
