import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { UserInfo } from 'src/app/core/models';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  public addCategoryForm: FormGroup;
  public userInfo: UserInfo;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private toasterservice: ToasterService
  ) {
    this.addCategoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required]],
      userId: ['', [Validators.required]],
    });
  }

  get f() {
    return this.addCategoryForm.controls;
  }

  ngOnInit() {
    console.table(this.navParams);
    this.userInfo = this.navParams.data.userInfo;
    if (this.userInfo) {
      this.addCategoryForm.patchValue({
        userId: this.userInfo.id,
      });
    }
  }

  public closeModal(value: boolean) {
    this.modalController.dismiss(value);
  }

  public addNewCategory() {
    console.table(this.addCategoryForm.value);

    if (!this.addCategoryForm.valid) {
      return;
    } else {
      const { API_CONFIG, API_URLs } = this.apiService;
      const url = `${API_CONFIG.apiHost}${API_URLs.listOfCategories}`;
      const config = {
        url,
        data: this.addCategoryForm.value,
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
}
