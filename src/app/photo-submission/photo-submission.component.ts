import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoInputComponent } from '../photo-input/photo-input.component';
import { PhotoStore } from '../store/photo.store';
import { FullpageNavigatorService } from '../services/fullpage-navigator.service';

@Component({
  selector: 'app-photo-submission',
  standalone: true,
  imports: [CommonModule, PhotoInputComponent],
  templateUrl: './photo-submission.component.html',
  styleUrls: ['./photo-submission.component.scss'],
})
export class PhotoSubmissionComponent implements OnInit {
  store = inject(PhotoStore);
  navigator = inject(FullpageNavigatorService);

  ngOnInit(): void {}

  onUpload(s: any) {
    console.log({ s });
  }

  onSubmit() {}
}
