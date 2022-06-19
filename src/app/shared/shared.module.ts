import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { IonicModule } from '@ionic/angular';
import { GroupByPipe } from './pipes/group-by.pipe';

@NgModule({
  declarations: [StatusComponent, GroupByPipe],
  imports: [CommonModule, IonicModule],
  exports:[GroupByPipe]
})
export class SharedModule {}
