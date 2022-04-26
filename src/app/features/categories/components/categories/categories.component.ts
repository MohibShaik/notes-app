import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/core/models/category.model';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  public userData: any;
  public categoriesList: Category[];
  constructor(
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private router: Router,
    private toasterservice: ToasterService,
    private dataService: DataService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    this.userData = this.dataService.getCurrentUserInfo();
    if (this.userData) {
      this.getListOfCategories();
    }
  }

  private getListOfCategories() {
    const { API_CONFIG, API_URLs } = this.apiService;
    const url = `${API_CONFIG.apiHost}${API_URLs.listOfCategories}`;

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
        this.toasterservice.presentToast(error?.error?.message);
      }
    );
  }
}
