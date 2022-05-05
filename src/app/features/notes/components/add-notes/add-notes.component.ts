import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Category, LabelItem, Labels } from 'src/app/core/models';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent implements OnInit {
  public userId: string;
  public addNoteForm: FormGroup;
  public categoriesList: Category[];
  public labels: LabelItem[];
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private toasterservice: ToasterService
  ) {
    this.addNoteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      label: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get f() {
    return this.addNoteForm.controls;
  }

  ngOnInit() {
    console.table(this.navParams);
    this.userId = this.navParams.data.userId;
    this.getAllCategories();
    this.getListOfLabels();
  }

  public closeModal(value: boolean) {
    this.modalController.dismiss(value);
  }

  public addNotes() {
    console.table(this.addNoteForm.value);

    if (!this.addNoteForm.valid) {
      return;
    } else {
      const { API_CONFIG, API_URLs } = this.apiService;
      const url = `${API_CONFIG.apiHost}${API_URLs.addNewNotes}`;
      this.addNoteForm.value.userId = this.userId;
      const config = {
        url,
        data: this.addNoteForm.value,
        cacheKey: false,
      };
      this.ajaxService.post(config).subscribe(
        (response) => {
          this.closeModal(true);
        },
        (error) => {
          console.log(error);
          this.toasterservice.presentToast(error?.error?.message, 'error-text');
        }
      );
    }
  }

  // get cats
  public getAllCategories() {
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
        // this.toasterservice.presentToast(error?.error?.message, 'error-text');
      }
    );
  }

  // get labels
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
        // this.toasterservice.presentToast(error?.error?.message, 'error-text');
      }
    );
  }
}
