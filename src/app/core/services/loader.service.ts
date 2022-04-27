import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private loader: LoadingController) {}

  async showHideAutoLoader() {
    await this.loader
      .create({
        message: 'Please wait...',
        duration: 2000,
      })
      .then((res) => {
        res.present();

        res.onDidDismiss().then((dis) => {});
      });
  }

  // Show the loader for infinite time
  showLoader() {
    this.loader
      .create({
        message: 'Please wait...',
      })
      .then((res) => {
        res.present();
      });
  }

  // Hide the loader if already created otherwise return error
  hideLoader() {
    this.loader
      .dismiss()
      .then((res) => {
        console.log('Loading dismissed!', res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }
}
