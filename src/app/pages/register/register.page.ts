import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AjaxService } from 'src/app/core/services/ajax.service';
import { ApiService } from 'src/app/core/services/api.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public signupForm: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye-off';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private ajaxService: AjaxService,
    private router: Router,
    private toasterservice: ToasterService
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {}

  get f() {
    return this.signupForm.controls;
  }

  public hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  public createUser() {
    if (this.signupForm.invalid) {
      return;
    } else {
      const { API_CONFIG, API_URLs } = this.apiService;
      const url = `${API_CONFIG.apiHost}${API_URLs.createNewUser}`;

      const config = {
        url,
        data: this.signupForm.value,
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
          console.log(error);
          this.toasterservice.presentToast(error?.error?.message);
        }
      );
    }
  }
}
