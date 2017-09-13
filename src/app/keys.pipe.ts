import { Pipe, PipeTransform } from '@angular/core';



@Pipe({ name: 'keys',  pure: false })
export class KeysPipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
    if (!value)
      return null;
    return Object.keys(value)//.map(key => value[key]);
  }
}
