import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';

let material = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule
]

@NgModule({
  declarations: [],
  imports: [material],
  exports: [material]
})
export class materialModule { }
