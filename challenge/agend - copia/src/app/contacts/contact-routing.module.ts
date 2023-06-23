import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactReactiveComponent } from './pages/add-contact-reactive/add-contact-reactive.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewContactsComponent } from './pages/view-contacts/view-contacts.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path: 'home', component: HomeComponent},//componente addContact, estamal el nombre,
                                                //tendria q haber tenido un modulo de rutas propio el addContact?
      {path: 'view-contacts', component: ViewContactsComponent},
      {path: 'view-contact/:id', component: AddContactComponent},
      {path: 'add-contact', component: AddContactComponent},
      {path: 'edit-contact/:id', component: AddContactComponent},
      {path: 'view-contacts-reactive', component: ViewContactsComponent},
      {path: 'add-contact-reactive', component: AddContactReactiveComponent},
      {path: 'edit-contact-reactive/:id', component: AddContactReactiveComponent},
      {path: 'view-contact-reactive/:id', component: AddContactReactiveComponent},
      {path: '**', redirectTo:'view-contacts'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
