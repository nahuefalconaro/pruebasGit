import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../interfaces/contact.interfaces';
import { Filtro } from '../interfaces/filtros.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts:Contact[] = [
    {
      nombre:'Nahuel',
      apellido:'Falconaro',
      documento: 41741866,
      pais:{name:'Argentina', code:'ARG'},
      ciudad:'Tandil',
      fechaNacimiento:new Date('1999-03-31T00:00:00'),
      contactoInterno: true,
      area:  {name:'Development', code:'DVLP'},
      fechaIngreso: new Date(),
      direccion: 'Belg 1242',
      telefono: '2281518296',
      email: 'nahuel_falconaro@edsa.com.ar',
    },
    {
      nombre:'Ezequiel',
      apellido:'Dos Santos',
      documento: 22675849,
      pais:{name:'Argentina', code:'ARG'},
      ciudad:'Tandil',
      fechaNacimiento:new Date('1999-03-29T00:00:00'),
      contactoInterno: true,
      area: {name:'Development', code:'DVLP'},
      fechaIngreso: new Date(),
      direccion: 'Belg 1242',
      telefono: '1234444',
      email: 'test2@edsa.com.ar',
    },
    {
      nombre:'Lionel',
      apellido:'Messi',
      documento: 2675804,
      pais:{name:'Argentina', code:'ARG'},
      ciudad:'Tandil',
      fechaNacimiento:new Date('1999-03-30T00:00:00'),
      contactoInterno: false,
      area:  {name:'RRHH', code: 'RRHH'},
      fechaIngreso: new Date(),
      direccion: 'Belg 1242',
      telefono: '1234567',
      email: 'test@edsa.com.ar',
    }
  ];

  constructor() { }

  get obtenerContactos():Observable<Contact[]>{
    return of([...this.contacts]);
  }

  filtrarContactos(filtro:Filtro):Observable<Contact[]>{
    let retorno:Contact[]=[];
    this.contacts.forEach((c:Contact) => {
      if (this.cumple(c, filtro)) {
        retorno.push(c)
      }
    });
    return of(retorno)
  }

  addContact(contact:Contact):Observable<Contact>{
    this.contacts.push(contact)

    return of(contact)
  }
  editContact(client:Contact):Observable<Contact>{

    const i = this.contacts.findIndex((c:Contact)=> c.documento == client.documento);
    this.contacts[i] = client;
    return of(this.contacts[i])
  }
  deleteContact(documento:number):Observable<any>{
    const i = this.contacts.findIndex((c:Contact)=> c.documento == documento);
    this.contacts.splice(i, 1);
    return of('ok')
  }
  getContact(documento:number):Observable<Contact>{
    const i = this.contacts.findIndex((c:Contact)=> c.documento === documento);
    return of({...this.contacts[i]});
  }

  private cumple(c:Contact, filtro:Filtro):boolean{
    return this.nameEqual(c, filtro) &&
    this.lastnameEqual(c, filtro) &&
    this.cityEquel(c, filtro) &&
    this.dateOfBirthEqual(c, filtro) &&
    this.internContactEqual(c, filtro) &&
    this.selectedAreaEqual(c, filtro) &&
    this.selectedCountryEqual(c, filtro)
  }

  private nameEqual(c:Contact, filtro:Filtro):boolean{
    if (filtro.name) return c.nombre.toLowerCase() === filtro.name!.toLowerCase()
    else return true
  }
  private lastnameEqual(c:Contact, filtro:Filtro):boolean{
    if (filtro.lastname) return c.apellido.toLowerCase() === filtro.lastname!.toLowerCase()
    else return true
  }
  private cityEquel(c:Contact, filtro:Filtro):boolean{
    if (filtro.city) return c.ciudad.toLowerCase() === filtro.city.toLowerCase()
    else return true
  }
  private dateOfBirthEqual(c:Contact, filtro:Filtro):boolean{
    if (filtro.selectedDate) return c.fechaNacimiento.getTime() === filtro.selectedDate.getTime()
    else return true
  }
  private internContactEqual(c:Contact, filtro:Filtro):boolean{
    if (filtro.internalContact) return c.contactoInterno === filtro.internalContact
    else return true
  }
  private selectedAreaEqual(c:Contact, filtro:Filtro):boolean{
    if (filtro.selectedArea && filtro.selectedArea.code !== '**') return c.area.name.toLowerCase() === filtro.selectedArea.name.toLowerCase()
    else return true
  }
  private selectedCountryEqual(c:Contact, filtro:Filtro):boolean{
    if (filtro.selectedCountry?.name && filtro.selectedCountry?.code !== '**') return c.pais.name.toLowerCase() === filtro.selectedCountry.name.toLowerCase()
    else return true
  }
}

