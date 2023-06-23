import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }


  validarSelect(control:FormControl):ValidationErrors | null{
    const value = control.value;
    return (value.code == '**')?{validarSelect: false}:null;
  }
}
