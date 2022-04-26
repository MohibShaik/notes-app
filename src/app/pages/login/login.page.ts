import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { StatusComponent } from 'src/app/shared/status/status.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}
  ngOnInit() {
    this.initializeLoginForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  public initializeLoginForm() {
    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async openModal(response, status: string, message: string) {
    const modalRef = await this.modalCtrl.create({
      component: StatusComponent,
      componentProps: {
        status: status,
        response: response,
        message: message,
      },
    });

    modalRef.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse?.data) {
        sessionStorage.setItem('user', JSON.stringify(response));
        sessionStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['home']);
      } else {
        return;
      }
    });

    return await modalRef.present();
  }

  public login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      const { API_CONFIG, API_URLs } = this.apiService;
      const url = `${API_CONFIG.apiHost}${API_URLs.login}`;

      const config = {
        url,
        data: this.loginForm.value,
        cacheKey: false,
      };
      this.ajaxService.post(config).subscribe(
        (response) => {
          console.log(response);
          sessionStorage.setItem('user', JSON.stringify(response));
          sessionStorage.setItem('accessToken', response.accessToken);
          this.router.navigate(['home']);
        },
        (error) => {
          this.openModal(
            error,
            'failure',
            'Ooops! your email and password do not match'
          );
        }
      );
    }
  }
}
