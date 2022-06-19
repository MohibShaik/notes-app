import { Component, OnInit } from '@angular/core';
import { Expense, UserInfo } from 'src/app/core/models';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
})
export class ExpensesListComponent implements OnInit {
  public expensesList: any;
  public userInfo: UserInfo;
  totalExpenses: number;
  constructor(
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private toasterservice: ToasterService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    const userData = this.dataService.getCurrentUserInfo();
    this.userInfo = userData.user;

    if (this.userInfo) {
      this.getListOfExpenses();
    }
  }

  public getListOfExpenses(event?: any) {
    const { API_CONFIG, API_URLs } = this.apiService;
    const url = `${API_CONFIG.apiHost}${API_URLs.listOfExpenses(
      this.userInfo?.id
    )}`;
    const config = {
      url,
      cacheKey: false,
    };
    this.ajaxService.get(config).subscribe(
      (response) => {
        console.log(response);
        this.expensesList = response;
        this.calculateExpense(this.expensesList);
        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.log(error);
        // this.toasterservice.presentToast(error?.error?.message, 'error-text');
      }
    );
  }

  public calculateExpense(expensesList: any[]) {
    if (expensesList.length) {
      this.totalExpenses = expensesList.reduce(this.add, 0);
      console.log(this.totalExpenses);
    }
  }

  private add(accumulator: number, a: Expense): number {
    return accumulator + a.amount;
  }
}
