import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {

  @Input() status: string;
  @Input() response: any;
  @Input() message: string;

  constructor(private modalCtr: ModalController) {
    
  }

  ngOnInit() {}

  async close(msg: boolean) {
    await this.modalCtr.dismiss(msg);
  }

}
