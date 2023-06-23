import { NgModule } from '@angular/core';

import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import { InputTextModule } from "primeng/inputtext";
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  declarations: [],
  imports: [
  ],
  exports:[
    TabMenuModule,
    TableModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    MessagesModule,
    MessageModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class PrimeNgModule { }
