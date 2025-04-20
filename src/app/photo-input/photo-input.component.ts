import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { fromEvent, pipe, switchMap, tap } from 'rxjs';
import { PhotoInputStore } from './photo-input.store';

@Component({
  selector: 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class PhotoInputComponent implements OnInit {
  store = inject(PhotoInputStore);

  stageFilesSelectionEffect = rxMethod<void>(
    pipe(
      switchMap(() =>
        fromEvent<Event>(this.fileInput()?.nativeElement, 'change')
      ),
      tap((changeEv: Event) => {
        this.store.stageFiles(
          Array.from((changeEv.target as HTMLInputElement).files || [])
        );
      })
    )
  );

  // addStagedFilesToSwiper = rxMethod<string[]>(
  //   pipe(
  //     tap((fileUrls) => {
  //       const diff = fileUrls.filter((url) =>
  //         this.store.stagedFileUrls().includes(url)
  //       );
  //       console.log({diff, el: this.swiperEl()})
  //       this.swiperEl()?.nativeElement.swiper.addSlide(1, diff.map(d => `<swiper-slide> <img class="swiper-image" src="${d}"></swiper-slide>`));
  //     })
  //   )
  // );

  ngOnInit() {
    this.stageFilesSelectionEffect();
    // this.addStagedFilesToSwiper(this.store.stagedFileUrls);
    console.log(this.store);
  }

  public fileInput = viewChild<ElementRef>('fileInput');

  private swiperEl = viewChild<ElementRef>('swiperEl');

  public onFileSelectionTrigger() {
    this.fileInput()?.nativeElement?.click();
  }

  public onFilesSelected(event: any) {
    console.log('onFileSelected', { event });
  }

  onFileUploaded(event: any) {
    console.log('onFileUploaded', { event });
  }
}
