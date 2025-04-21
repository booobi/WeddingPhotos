import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-staged-photo',
  templateUrl: './staged-photo.component.html',
  styleUrls: ['./staged-photo.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class StagedPhotoComponent {
  imageSrc = input.required<string>();

  remove = output<string>();

  onRemove() {
    this.remove.emit(this.imageSrc());
  }
}
