import { Component } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileInputComponent } from '../file-input/file-input.component';


@Component({
  selector: 'app-photo-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FileInputComponent],
  templateUrl: './photo-submission.component.html',
  styleUrls: ['./photo-submission.component.scss']
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