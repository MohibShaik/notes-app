import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private router: Router) {}

  public getCurrentUserInfo() {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    return userData;
  }

  public getToken(): boolean {
    return !!sessionStorage.getItem('accessToken');
  }

  public logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
