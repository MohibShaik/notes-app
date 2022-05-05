import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLabelComponent } from './components/add-label/add-label.component';
import { LabelListComponent } from './components/label-list/label-list.component';

const routes: Routes = [
  {
    path: '',
    component: LabelListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabelManagementRoutingModule {}
