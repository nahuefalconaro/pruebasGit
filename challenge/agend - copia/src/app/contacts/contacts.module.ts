import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewContactsComponent } from './pages/view-contacts/view-contacts.component';
import { ContactsTableComponent } from './components/contacts-table/contacts-table.component';
import { FilterComponent } from './components/filter/filter.component';

import { ContactRoutingModule } from './contact-routing.module';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentTransformPipe } from './pipes/document-transform.pipe';
import { FormContactComponent } from './components/form-contact/form-contact.component';
import { AddContactReactiveComponent } from './pages/add-contact-reactive/add-contact-reactive.component';
import { FormReactiveComponent } from './components/form-reactive/form-reactive.component';


@NgModule({
  declarations: [
    AddContactComponent,
    HomeComponent,
    ViewContactsComponent,
    ContactsTableComponent,
    FilterComponent,
    FormContactComponent,
    DocumentTransformPipe,
    AddContactReactiveComponent,
    FormReactiveComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[

  ]
})
export class ContactsModule { }
