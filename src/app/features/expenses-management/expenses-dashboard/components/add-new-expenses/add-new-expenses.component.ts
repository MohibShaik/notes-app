import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Category, UserInfo } from 'src/app/core/models';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-new-expenses',
  templateUrl: './add-new-expenses.component.html',
  styleUrls: ['./add-new-expenses.component.scss'],
})
export class AddNewExpensesComponent implements OnInit {
  public addExpenseForm: FormGroup;
  public categoriesList: Category[];
  public tabName: string = 'expenses';

  public userInfo: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private toasterservice: ToasterService,
    private currencyPipe: CurrencyPipe,
    private dataService: DataService
  ) {
    this.addExpenseForm = this.fb.group({
      category: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      name: ['', [Validators.required]],
      createdDate: [''],
    });
  }

  get f() {
    return this.addExpenseForm.controls;
  }
  ngOnInit() {
    this.userInfo = this.dataService.getCurrentUserInfo();
    this.getAllCategories();
  }

  public getAllCategories() {
    const { API_CONFIG, API_URLs } = this.apiService;
    const url = `${API_CONFIG.apiHost}${API_URLs.listOfCategoriesByTabName(
      this.tabName
    )}`;
    const config = {
      url,
      cacheKey: false,
    };
    this.ajaxService.get(config).subscribe(
      (response) => {
        console.log(response);
        this.categoriesList = response;
      },
      (error) => {
        console.log(error);
        // this.toasterservice.presentToast(error?.error?.message, 'error-text');
      }
    );
  }

  public addNewExpense() {
    console.table(this.addExpenseForm.value);
    if (!this.addExpenseForm.valid) {
      return;
    } else {
      const { API_CONFIG, API_URLs } = this.apiService;
      const url = `${API_CONFIG.apiHost}${API_URLs.addExpense}`;
      this.addExpenseForm.value.userId = this.userInfo?.user.id;

      const config = {
        url,
        data: this.addExpenseForm.value,
        cacheKey: false,
      };

      this.ajaxService.post(config).subscribe(
        (response) => {
          this.closeModal(true);
        },
        (error) => {
          this.toasterservice.presentToast(error?.error?.message, 'error-text');
        }
      );
    }
  }

  public closeModal(value: boolean) {
    this.modalController.dismiss(value);
  }
}
