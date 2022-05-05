import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LabelItem } from 'src/app/core/models';
import { NotesItem } from 'src/app/core/models/notes.model';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DataService } from 'src/app/core/services/data.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { AddNotesComponent } from '../add-notes/add-notes.component';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  public userData: any;
  public notesList: NotesItem[];
  bgColor: string;
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
      this.getListOfNotes();
    }
  }

  public getListOfNotes(event?: any) {
    const { API_CONFIG, API_URLs } = this.apiService;
    const url = `${API_CONFIG.apiHost}${API_URLs.listOfNotesByUserId(
      this.userData.user.id
    )}`;

    const config = {
      url,
      cacheKey: false,
    };
    this.ajaxService.get(config).subscribe(
      (response) => {
        console.log(response);
        this.notesList = response;
        if (event) {
          event.target.complete();
        }
        this.notesList.forEach((x) => this.pickLabelColor(x.label));
      },
      (error) => {
        console.log(error.error);
        if (error.error.status === 403) {
          this.toasterservice.presentToast(error?.error?.message, 'error-text');
        }
      }
    );
  }

  public pickLabelColor(labels: LabelItem[]) {
    let bgColors = [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'medium',
    ];
    labels.forEach(
      (label) =>
        (label.bgColor = bgColors[Math.floor(Math.random() * bgColors.length)])
    );
    console.log(labels);

    // console.log(bgColors[Math.floor(Math.random() * bgColors.length)]);
    // labels.bgColor = bgColors[Math.floor(Math.random() * bgColors.length)]
  }

  public async addNotes() {
    const modal = await this.modalController.create({
      component: AddNotesComponent,
      componentProps: {
        userId: this.userData.user.id,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data) {
        this.toasterservice.presentToast(
          'Note Added Successfully',
          'success-text'
        );
        this.getListOfNotes();
      }
    });

    return await modal.present();
  }
}
