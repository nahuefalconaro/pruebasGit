import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, PrimeNGConfig, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { Area } from '../../interfaces/area.interface';
import { Contact } from '../../interfaces/contact.interfaces';
import { Country } from '../../interfaces/pais.interfaces';
import { AreasService } from '../../services/areas.service';
import { ContactsService } from '../../services/contacts.service';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css'],
})
export class FormContactComponent {
  countries: Country[] = [];
  areas: Area[] = [];
  msgs: Message[] = [];
  isAddAction?: string;
  isViewContact?: boolean;
  contactoAdd: Contact = {
    nombre: '',
    apellido: '',
    pais: { name: '', code: '' },
    area: { name: '', code: '' },
    ciudad: '',
    contactoInterno: false,
    direccion: '',
    telefono: '',
    email: '',
    documento: '',
    fechaNacimiento: new Date(),
    fechaIngreso: new Date(),
  };

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private _areaService: AreasService,
    private _paisService: PaisesService,
    private _contactService: ContactsService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
  ) {
    this.primengConfig.ripple = true;
  }

  ngOnInit() {
    this._areaService.getAreas.subscribe(
      (areas: Area[]) => (this.areas = areas)
    );
    this._paisService.getCountries.subscribe(
      (countries: Country[]) => (this.countries = countries)
    );
    this._activatedRouter.params.subscribe((p) => (this.isAddAction = p['id']));
    this._activatedRouter.url.subscribe(
      (p) => (this.isViewContact = p[0].path! == 'view-contact')
    );
    if (this.isAddAction) {
      this._activatedRouter.params
        .pipe(switchMap(({ id }) => this._contactService.getContact(id))) //obtiene la info de la funcion y la retorna para qe el sbscribe lo use
        .subscribe((contact: Contact) => (this.contactoAdd = contact)); //se subscribe a la respuesta del switchmap?
      // el uso mas comun que tiene es para evitar anidar dos suscripciones, una dentro de la otra
      // cuando precisas el resultado de la primera para buscar la segunda
    }
  }

  checkEmptyInputs(): boolean {
    return (
      this.contactoAdd.nombre.trim().length == 0 ||
      this.contactoAdd.apellido.trim().length == 0 ||
      this.contactoAdd.pais?.code == '**' ||
      this.contactoAdd.ciudad.trim().length == 0 ||
      this.contactoAdd.direccion.trim().length == 0 ||
      this.contactoAdd.telefono.trim().length == 0 ||
      this.contactoAdd.email.trim().length == 0
    );
  }

  addContact() {
    if (this.checkEmptyInputs()) {
      return;
    }
    if (this.contactoAdd.documento) {
      console.log(this.contactoAdd);

      this._contactService
        .editContact(this.contactoAdd)
        .subscribe((resp) => console.log(resp, 'Modificacion de contacto'));
      this.showMsg(
        `Contacto con el DNI: ${this.contactoAdd.documento} ha sido modificado con exito!`
      );
    } else {
      console.log(this.contactoAdd, 'aca');
      this.contactoAdd.documento = String(
        Math.random() * 1000000
      );
      this.contactoAdd.fechaNacimiento = this.randomDate(
        new Date(1960, 0, 1),
        new Date(2004, 0, 1)
      );
      this.contactoAdd.fechaIngreso = this.randomDate(
        new Date(2000, 0, 1),
        new Date()
      );
      this._contactService
        .addContact(this.contactoAdd)
        .subscribe((resp) => console.log(resp, 'Agregado de contacto'));
      this.showMsg(`Contacto agregado con exito`);
    }
    setTimeout(() => {
      this._router.navigate(['/view-contacts']);
    }, 1500);
  }
  showMsg(msg: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: msg,
    });
  }
  randomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
}
