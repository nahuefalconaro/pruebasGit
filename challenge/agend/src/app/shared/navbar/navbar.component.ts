import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items!: MenuItem[];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink:['home'] },
      { label: 'View Contacts', icon: 'pi pi-fw pi-users', routerLink:['view-contacts'] },
      { label: 'Add Contact', icon: 'pi pi-fw pi-user-plus', routerLink:['add-contact'] },
      { label: 'Add Contact Reactive', icon: 'pi pi-fw pi-user-plus', routerLink:['add-contact-reactive'] },
    ];
  }
}
