import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  private getListOfNotes() {
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
      },
      (error) => {
        console.log(error);
        this.toasterservice.presentToast(error?.error?.message);
      }
    );
  }

  public async addNotes() {
    const modal = await this.modalController.create({
      component: AddNotesComponent,
      componentProps: {
        userId: this.userData.user.id,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      
    });

    return await modal.present();
  }
}
