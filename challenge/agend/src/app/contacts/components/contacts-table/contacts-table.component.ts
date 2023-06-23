import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../interfaces/contact.interfaces';
import { Filtro } from '../../interfaces/filtros.interface';
import { Country } from '../../interfaces/pais.interfaces';
import { ContactsService } from '../../services/contacts.service';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.css'],
})
export class ContactsTableComponent implements OnInit {
  @Input() contacts: Contact[] = [];

  @Input() filtros!: Filtro;

  isReactive!:boolean;
  msgs: Message[] = [];
  constructor(
    private _contactService: ContactsService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private _activatedRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this._activatedRouter.url.subscribe((p) => {
      this.isReactive = (p[0].path! =='view-contacts-reactive')
    })
  }
  delete(documento: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._contactService.deleteContact(documento).subscribe((c:Contact)=>{
          this.contacts = this.contacts.filter((c:Contact) => c.documento !== documento)

        });
        this.showMsg(`Contacto eliminado con exito`, true);
        this.confirmationService.close();
      },
      reject: () => {

        this.showMsg(`Accion rechazada`, false);
        this.confirmationService.close();
      },
    });

  }

  showMsg(msg:string, isDelete:boolean){
    this.messageService.add({
      severity: isDelete? 'error':'warn',
      summary: isDelete? 'Deleted':'Reject',
      detail: msg,
    });
  }
}
