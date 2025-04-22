import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullpageNavigatorService } from '../services/fullpage-navigator.service';
import { NgxMasonryModule } from 'ngx-masonry';
import { PhotoStore } from '../store/photo.store';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxMasonryModule]
})
export class PhotoGalleryComponent implements OnInit {
  navigator = inject(FullpageNavigatorService);
  store = inject(PhotoStore);

  masonryOptions = {
    columnWidth: '.grid-sizer',
    // percentPosition: true
    gutter: 10,
  }

  constructor() { }

  ngOnInit() {
    this.store.getGalleryImages();

  }

}
