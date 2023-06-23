import { Area } from "./area.interface"
import { Country } from "./pais.interfaces"

export interface Filtro{
  name?: string,
  lastname?:string,
  city?:string,
  selectedDate?:Date,
  internalContact?:boolean,
  selectedArea?:Area,
  selectedCountry?:Country
}
