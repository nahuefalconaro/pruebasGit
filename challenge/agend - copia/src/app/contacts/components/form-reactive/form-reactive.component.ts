import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, PrimeNGConfig, MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { Area } from '../../interfaces/area.interface';
import { Contact } from '../../interfaces/contact.interfaces';
import { Country } from '../../interfaces/pais.interfaces';
import { AreasService } from '../../services/areas.service';
import { ContactsService } from '../../services/contacts.service';
import { PaisesService } from '../../services/paises.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css'],
})
export class FormReactiveComponent {
  contacts: Contact[] = [];
  countries: Country[] = [];
  areas: Area[] = [];
  msgs: Message[] = [];
  isAddAction?: string;
  isViewContact?: boolean;
  contact: Contact = {
    nombre: '',
    apellido: '',
    pais: { name: 'Seleccione', code: '**' },
    area: { name: 'Seleccione/Todas', code: '**' },
    ciudad: '',
    contactoInterno: false,
    direccion: '',
    telefono: '',
    email: '',
    documento:0,
    fechaNacimiento: new Date(),
    fechaIngreso: new Date(),
  };
  formulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required], //value, validaciones, validaciones asincronas
    apellido: ['', Validators.required],
    pais: [{ name: 'Seleccione', code: '**' },  [Validators.required,this._validatorService.validarSelect]],
    ciudad: ['', Validators.required],
    area: [{  name: 'Seleccione/Todas', code: '**'}],
    direccion: ['', Validators.required],
    telefono: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    contactoInterno: [false],
  });
  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private _areaService: AreasService,
    private _paisService: PaisesService,
    private _contactService: ContactsService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private _validatorService:ValidatorsService
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

    this._activatedRouter.url.subscribe((p) => {
      this.isViewContact = p[0].path! == 'view-contact-reactive';
    });
    this._contactService.obtenerContactos.subscribe(
      (c: Contact[]) => (this.contacts = c)
    );
    if (this.isAddAction) {

      this._activatedRouter.params
        .pipe(switchMap(({ id }) => this._contactService.getContact(id))) //obtiene la info de la funcion y la retorna para qe el sbscribe lo use
        .subscribe((contact: Contact) => {
          this.contact = contact;
          this.formulario = this.fb.group({
            nombre: [contact.nombre, Validators.required], //value, validaciones, validaciones asincronas
            apellido: [contact.apellido, Validators.required],
            pais: [contact.pais, [Validators.required,this._validatorService.validarSelect]], //validador personalizado
            ciudad: [contact.ciudad, Validators.required],
            area: [contact.area],
            direccion: [contact.direccion, Validators.required],
            telefono: [contact.telefono, Validators.required],
            email: [
              contact.email,
              [
                Validators.required,
                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
              ],
            ],
            contactoInterno: [contact.contactoInterno],
          });
        }); //se subscribe a la respuesta del switchmap?
      // el uso mas comun que tiene es para evitar anidar dos suscripciones, una dentro de la otra
      // cuando precisas el resultado de la primera para buscar la segunda
    }
    if (this.isViewContact) {
      Object.keys(this.formulario.controls).forEach((key) => {
        this.formulario.controls[key].disable();
      });
    }
  }
  addContact() {
    Object.assign(this.contact, this.formulario.getRawValue())
    if (this.formulario.invalid) {
      return;
    }
    if (this.isAddAction) {
      this._contactService
        .editContact(this.contact)
        .subscribe((resp) => console.log(resp, 'Modificacion de contacto'));
      this.showMsg(
        `Contacto con el DNI: ${this.contact.documento} ha sido modificado con exito!`
      );
    } else {
      this.contact.documento = Math.ceil(Math.random() * 10000000);
      this.contact.fechaNacimiento = this.randomDate(
        new Date(1960, 0, 1),
        new Date(2004, 0, 1)
      );
      this.contact.fechaIngreso = this.randomDate(
        new Date(2000, 0, 1),
        new Date()
      );
      this._contactService
        .addContact(this.contact)
        .subscribe((resp) => console.log(resp, 'Contacto agregado'));
      this.showMsg(`Contacto agregado con exito`);
    }
    setTimeout(() => {
      this._router.navigate(['/view-contacts-reactive']);
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
