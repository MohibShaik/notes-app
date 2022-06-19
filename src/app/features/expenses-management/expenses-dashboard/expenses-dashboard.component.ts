import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AddNewExpensesComponent } from './components/add-new-expenses/add-new-expenses.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';

@Component({
  selector: 'app-expenses-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.scss'],
})
export class ExpensesDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(ExpensesListComponent, { static: false })
  list: ExpensesListComponent;
  constructor(
    private modalCtrl: ModalController,
    private toasterservice: ToasterService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log(this.list);
  }

  public async addNewExpense() {
    const presentModel = await this.modalCtrl.create({
      component: AddNewExpensesComponent,
      showBackdrop: true,
      cssClass: 'change-address-shipping-modal',
    });

    presentModel.onWillDismiss().then((data) => {
      if (data?.data)
        this.toasterservice.presentToast(
          'Expense Added Successfully',
          'success-text'
        );
        this.list.getListOfExpenses();
    });

    return await presentModel.present();
  }
}
