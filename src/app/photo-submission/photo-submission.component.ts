import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoInputComponent } from '../photo-input/photo-input.component';
import { PhotoInputStore } from '../photo-input/photo-input.store';

@Component({
  selector: 'app-photo-submission',
  standalone: true,
  imports: [CommonModule, PhotoInputComponent],
  templateUrl: './photo-submission.component.html',
  styleUrls: ['./photo-submission.component.scss'],
  providers: [PhotoInputStore],
})
export class PhotoSubmissionComponent implements OnInit {
  store = inject(PhotoInputStore);

  ngOnInit(): void {}

  onUpload(s: any) {
    console.log({ s });
  }

  onSubmit() {}
}
