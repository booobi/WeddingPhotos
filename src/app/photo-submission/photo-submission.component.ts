import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoInputComponent } from '../photo-input/photo-input.component';
import { PhotoStore } from '../store/photo.store';
import { FullpageNavigatorService } from '../services/fullpage-navigator.service';
import { FirebaseService } from '../services/firebase.service';

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
  firebaseService = inject(FirebaseService)

  ngOnInit(): void {}

  onUpload() {
    this.firebaseService.uploadFile(this.store.stagedFiles()[0])
  }

  onSubmit() {}
}
