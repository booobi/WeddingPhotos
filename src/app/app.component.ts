import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { FullpageNavigatorService } from './services/fullpage-navigator.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PhotoGalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'wedding-table-photos';

  navigator = inject(FullpageNavigatorService);

  ngOnInit(): void {
    this.navigator.initialize('#fullpage');
  }
}
