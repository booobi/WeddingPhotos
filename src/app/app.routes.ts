import { Routes } from '@angular/router';
import { PhotoSubmissionComponent } from './photo-submission/photo-submission.component';

export const routes: Routes = [
  { path: 'submit-photo', component: PhotoSubmissionComponent },
  { path: '', redirectTo: '/submit-photo', pathMatch: 'full' }
];
