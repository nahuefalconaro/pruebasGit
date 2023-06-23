import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documentTransform'
})
export class DocumentTransformPipe implements PipeTransform {

  transform(value: number):string {
    console.log(value);
    console.log(typeof value);

    let arr = Array.from(String(value));
    arr = arr.reverse();
    arr.splice(3,0,'.');
    arr.splice(7,0,'.');
    return arr.reverse().join('');
  }
}
