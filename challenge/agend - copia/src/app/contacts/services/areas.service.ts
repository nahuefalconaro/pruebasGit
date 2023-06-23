import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Area } from '../interfaces/area.interface';


@Injectable({
  providedIn: 'root'
})
export class AreasService {

  areas:Area[] = [
    {name: 'Seleccione/Todas', code:'**'},
    {name: 'Marketing', code:'MKT'},
    {name: 'Finanzas', code:'FNZ'},
    {name: 'RRHH', code:'RRHH'},
    {name: 'Development', code:'DVLP'}
  ]
  constructor() { }

  get getAreas():Observable<any[]>{
    return of([...this.areas])
  }
}
