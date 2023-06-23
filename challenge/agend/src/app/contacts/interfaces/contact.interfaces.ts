import { Area } from "./area.interface";
import { Country } from "./pais.interfaces";

export interface Contact{
    nombre:string,
    apellido:string,
    documento:string,
    pais:Country,
    ciudad:string,
    fechaNacimiento: Date,
    contactoInterno: boolean,
    area:Area,
    fechaIngreso:Date,
    direccion:string,
    telefono:string,
    email:string,
}
