import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LabelItem, Labels } from 'src/app/core/models';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AddLabelComponent } from '../add-label/add-label.component';

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
})
export class LabelListComponent implements OnInit {
  public userData: any;
  labels: LabelItem[];
  constructor(
    private router: Router,
    private apiService: ApiService,
    private ajaxService: AjaxService,
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
      this.getListOfLabels();
    }
  }

  private getListOfLabels() {
    const { API_CONFIG, API_URLs } = this.apiService;
    const url = `${API_CONFIG.apiHost}${API_URLs.listOfLabels}`;

    const config = {
      url,
      cacheKey: false,
    };

    this.ajaxService.get(config).subscribe(
      (response: Labels) => {
        console.log(response);
        this.labels = response?.data;
      },
      (error) => {
        console.log(error);
        this.toasterservice.presentToast(error?.error?.message, 'error-text');
      }
    );
  }

  public async addNewLabel() {
    const modal = await this.modalController.create({
      component: AddLabelComponent,
      componentProps: {
        userInfo: this.userData.user,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.toasterservice.presentToast(
          'Label Added Successfully',
          'success-text'
        );
        this.getListOfLabels();
      }
    });

    return await modal.present();
  }
}
