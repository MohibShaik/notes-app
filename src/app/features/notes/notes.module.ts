import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { AddNotesComponent } from './components/add-notes/add-notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [NotesListComponent, AddNotesComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], 
          ['blockquote', 'code-block'],

          [{ header: 1 }, { header: 2 }], 
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], 
          [{ indent: '-1' }, { indent: '+1' }], 
          [{ direction: 'rtl' }], 

          [{ size: ['small', false, 'large', 'huge'] }], 
          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], 
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], 

          ['link', 'image', 'video'],
        ],
      },
    }),
  ],
})
export class NotesModule {}
