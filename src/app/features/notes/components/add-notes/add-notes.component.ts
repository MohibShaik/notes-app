import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
})
export class AddNotesComponent implements OnInit {
  public userId: string;
  public addNoteForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder
  ) {
    this.addNoteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      label: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get f() {
    return this.addNoteForm.controls;
  }

  ngOnInit() {
    console.table(this.navParams);
    this.userId = this.navParams.data.userId;
  }

  public closeModal() {
    this.modalController.dismiss();
  }
}
