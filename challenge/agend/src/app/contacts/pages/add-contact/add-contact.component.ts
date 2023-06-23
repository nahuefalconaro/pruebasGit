import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { switchMap } from 'rxjs';
import { Area } from '../../interfaces/area.interface';
import { Contact } from '../../interfaces/contact.interfaces';
import { Country } from '../../interfaces/pais.interfaces';
import { AreasService } from '../../services/areas.service';
import { ContactsService } from '../../services/contacts.service';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
// implements OnInit
export class AddContactComponent{
   constructor(){
   }
}

