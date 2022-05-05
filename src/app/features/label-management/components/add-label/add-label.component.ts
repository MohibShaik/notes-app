import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { UserInfo } from 'src/app/core/models';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss'],
})
export class AddLabelComponent implements OnInit {
  public addLabelForm: FormGroup;
  public userInfo: UserInfo;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private toasterservice: ToasterService
  ) {
    this.addLabelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required]],
      createdBy: ['', [Validators.required]],
    });
  }

  get f() {
    return this.addLabelForm.controls;
  }

  ngOnInit() {
    console.table(this.navParams);
    this.userInfo = this.navParams.data.userInfo;
    if (this.userInfo) {
      this.addLabelForm.patchValue({
        createdBy: this.userInfo.username,
      });
    }
  }

  public closeModal(value: boolean) {
    this.modalController.dismiss(value);
  }

  public addNewLabel() {
    console.table(this.addLabelForm.value);

    if (!this.addLabelForm.valid) {
      return;
    } else {
      const { API_CONFIG, API_URLs } = this.apiService;
      const url = `${API_CONFIG.apiHost}${API_URLs.addNewLabel}`;
      const config = {
        url,
        data: this.addLabelForm.value,
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
