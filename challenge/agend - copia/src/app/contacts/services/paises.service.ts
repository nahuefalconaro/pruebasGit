import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  countries:Country[] = [
    {name: 'Seleccione', code: '**'},
    {name: 'Argentina', code:'ARG'},
    {name: 'Estados Unidos', code:'USA'},
    {name: 'Uruguay', code:'URY'},
    {name: 'España', code:'ESP'}
  ];
  constructor() { }

  get getCountries():Observable<Country[]>{
    return of([...this.countries])
  }
}
