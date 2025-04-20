import { Component } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhotoInputComponent } from '../photo-input/photo-input.component';
import { PhotoInputStore } from '../photo-input/photo-input.store';


@Component({
  selector: 'app-photo-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PhotoInputComponent],
  templateUrl: './photo-submission.component.html',
  styleUrls: ['./photo-submission.component.scss'],
  providers: [PhotoInputStore],
})
export class PhotoSubmissionComponent {
  
  constructor(private fb: FormBuilder) {
  }

  onUpload(s: any) {
    console.log({s})

  }


  onSubmit() {
  }
} 