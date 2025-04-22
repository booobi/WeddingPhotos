import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { FullpageNavigatorService } from './services/fullpage-navigator.service';
import { PhotoStore } from './store/photo.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PhotoGalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PhotoStore],
})
export class AppComponent implements OnInit{
  title = 'wedding-table-photos';

  navigator = inject(FullpageNavigatorService);

  ngOnInit(): void {
    this.navigator.initialize('#fullpage');
  }
}
