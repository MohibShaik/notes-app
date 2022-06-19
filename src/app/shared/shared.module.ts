import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { IonicModule } from '@ionic/angular';
import { GroupByPipe } from './pipes/group-by.pipe';
import { NumberOnlyDirective } from './directives/number-only.directive';

@NgModule({
  declarations: [StatusComponent, GroupByPipe, NumberOnlyDirective],
  imports: [CommonModule, IonicModule],
  exports:[GroupByPipe , NumberOnlyDirective]
})
export class SharedModule {}
