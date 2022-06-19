import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ExpensesManagementRoutingModule } from './expenses-management-routing.module';
import { ExpensesDashboardComponent } from './expenses-dashboard/expenses-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpensesListComponent } from './expenses-dashboard/components/expenses-list/expenses-list.component';
import { ExpensesStasticsComponent } from './expenses-dashboard/components/expenses-stastics/expenses-stastics.component';
import { AddNewExpensesComponent } from './expenses-dashboard/components/add-new-expenses/add-new-expenses.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ExpensesDashboardComponent,
    ExpensesListComponent,
    ExpensesStasticsComponent,
    AddNewExpensesComponent,
  ],
  imports: [
    CommonModule,
    ExpensesManagementRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [AddNewExpensesComponent],
  providers: [CurrencyPipe],
})
export class ExpensesManagementModule {}
