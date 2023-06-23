import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { AMaterialModule } from '../a-material/a-material.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    AMaterialModule,
    IonicModule
  ],
  exports:[
    TableComponent
  ]
})
export class TableModule { }
