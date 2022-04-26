import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [NotesListComponent, AddNotesComponent],
  imports: [CommonModule, NotesRoutingModule, FormsModule, IonicModule , ReactiveFormsModule],
})
export class NotesModule {}
