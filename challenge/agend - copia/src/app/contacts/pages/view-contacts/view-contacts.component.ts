import { Component, OnInit } from '@angular/core';
import { Contact } from '../../interfaces/contact.interfaces';
import { Filtro } from '../../interfaces/filtros.interface';
import { Country } from '../../interfaces/pais.interfaces';
import { AreasService } from '../../services/areas.service';
import { ContactsService } from '../../services/contacts.service';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-view-contacts',
  templateUrl: './view-contacts.component.html',
  styleUrls: ['./view-contacts.component.css']
})
export class ViewContactsComponent implements OnInit{

  filtros!:Filtro;
  contacts:Contact[] = [];
  countries:Country[] = [];
  areas:any[] = [];

  constructor(
    private _contactService:ContactsService,
    private _countryService:PaisesService,
    private _areaService:AreasService
  ){

  }

  ngOnInit(): void {
    this._contactService.obtenerContactos.subscribe((resp:Contact[]) => this.contacts = resp);
    console.log(this.contacts, 'en view-contacts');

    this._countryService.getCountries.subscribe((resp:Country[])=> this.countries = resp);
    this._areaService.getAreas.subscribe((resp:any[])=> this.areas = resp);
    if(localStorage.getItem('lastFilters')){
      let filtrosLocalStorage:Filtro = JSON.parse(localStorage.getItem('lastFilters')!);
      this._contactService.filtrarContactos(filtrosLocalStorage).subscribe((c:Contact[])=> this.contacts = c);
    }
  }

  filtrosSet(filtros:Filtro){
    this.filtros = filtros;
    if (!this.checkEmptyFilters()) {
     localStorage.setItem('lastFilters', JSON.stringify(this.filtros))
    }else{
      if(localStorage.getItem('lastFilters')){
       localStorage.removeItem('lastFilters');
      }
    }
    this._contactService.filtrarContactos(this.filtros).subscribe((c:Contact[])=> this.contacts = c);
  }
  checkEmptyFilters():boolean{
    return ((!this.filtros.selectedCountry || this.filtros.selectedCountry.code === '**') && !this.filtros.name && !this.filtros.lastname && !this.filtros.city && !this.filtros.internalContact && !this.filtros.selectedDate && (!this.filtros.selectedArea  || this.filtros.selectedArea.code === '**'))
  }
}
