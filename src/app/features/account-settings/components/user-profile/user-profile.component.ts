import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserModel } from 'src/app/core/models';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public userData: UserModel;

  constructor(
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private router: Router,
    private toasterservice: ToasterService,
    private dataService: DataService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    this.userData = this.dataService.getCurrentUserInfo();
    if (this.userData) {
      console.log(this.userData)
    }
  }

  public logout(){
   this.dataService.logout();
  }

}
