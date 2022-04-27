import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class AccountSettingsModule {}
