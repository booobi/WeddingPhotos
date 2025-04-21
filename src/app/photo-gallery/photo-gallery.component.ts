import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FullpageNavigatorService } from '../services/fullpage-navigator.service';
import { MasonryService } from '../services/masonry.service';
import { NgxMasonryModule } from 'ngx-masonry';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxMasonryModule]
})
export class PhotoGalleryComponent implements OnInit {
  navigator = inject(FullpageNavigatorService);
  masonryService = inject(MasonryService);

  imageUrls = [
    "https://buffer.com/resources/content/images/2024/11/free-stock-image-sites.png",
    "https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp",
    "https://static.desygner.com/wp-content/uploads/sites/13/2022/05/04141642/Free-Stock-Photos-01.jpg",
    "https://gratisography.com/wp-content/uploads/2025/01/gratisography-dog-vacation-800x525.jpg",
    "https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/violet-colorful-sunset-sky-on-the-beach-free-photo.jpeg?w=600&quality=80"
  ];

  masonryOptions = {
    columnWidth: '.grid-sizer',
    // percentPosition: true
    gutter: 10,
  }

  constructor() { }

  ngOnInit() {
    this.masonryService.initialize('.grid', '.grid-item');
  }

}
