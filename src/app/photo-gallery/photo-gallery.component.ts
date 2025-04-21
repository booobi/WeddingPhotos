import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullpageNavigatorService } from '../services/fullpage-navigator.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PhotoGalleryComponent implements OnInit {
  navigator = inject(FullpageNavigatorService);

  constructor() { }

  ngOnInit() {
  }

}
