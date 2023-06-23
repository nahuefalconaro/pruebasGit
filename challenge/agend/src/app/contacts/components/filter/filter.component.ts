import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Area } from '../../interfaces/area.interface';
import { Filtro } from '../../interfaces/filtros.interface';
import { Country } from '../../interfaces/pais.interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{

  selectedCountry?:Country;
  @Input() areas:Area[] = [];
  @Input() countries:Country[] = [];
  selectedArea?:Area;
  loading = false;

  name?:string;
  lastname?:string;
  city?:string;
  selectedDate?:Date;
  internalContact?:boolean;

  @Output() camposFiltro:EventEmitter<Filtro>;
  constructor(){
    this.camposFiltro = new EventEmitter()
  }

  ngOnInit(): void {

  }

  search(){

    this.camposFiltro.emit({
      name: this.name,
      lastname: this.lastname,
      city: this.city,
      selectedDate: this.selectedDate,
      internalContact: this.internalContact,
      selectedArea: this.selectedArea,
      selectedCountry: this.selectedCountry
    }
 )
    this.loading = true;
    setTimeout(() => this.loading = false, 1000);
  }
}
