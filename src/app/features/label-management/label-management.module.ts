import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelManagementRoutingModule } from './label-management-routing.module';
import { LabelListComponent } from './components/label-list/label-list.component';
import { AddLabelComponent } from './components/add-label/add-label.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LabelListComponent, AddLabelComponent],
  imports: [
    CommonModule,
    LabelManagementRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class LabelManagementModule {}
