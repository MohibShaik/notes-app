import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserInfo } from 'src/app/core/models';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-expenses-stastics',
  templateUrl: './expenses-stastics.component.html',
  styleUrls: ['./expenses-stastics.component.scss'],
})
export class ExpensesStasticsComponent implements OnInit {
  public userInfo: UserInfo;
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo() {
    const userData = this.dataService.getCurrentUserInfo();
    this.userInfo = userData.user;
  }
}
