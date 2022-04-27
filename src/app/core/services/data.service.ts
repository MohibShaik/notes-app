import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  public getCurrentUserInfo() {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    return userData;
  }

  public getToken(): boolean {
    return !!sessionStorage.getItem('accessToken');
  }
}
