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
import { fromEvent, merge, pipe, switchMap, tap } from 'rxjs';
import { PhotoStore } from '../store/photo.store';
import { CommonModule } from '@angular/common';
import { StagedPhotoComponent } from './staged-photo/staged-photo.component';

@Component({
  selector: 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, StagedPhotoComponent]
})
export class PhotoInputComponent implements OnInit {
  store = inject(PhotoStore);

  stageFilesSelectionEffect = rxMethod<void>(
    pipe(
      switchMap(() =>
        merge(
          fromEvent<Event>(this.fileInput()?.nativeElement, 'change'),
          fromEvent<Event>(
            this.cameraInput()?.nativeElement,
            'change'
          )
        )
      ),
      tap((changeEv: Event) => {
        this.store.stageFiles(
          Array.from((changeEv.target as HTMLInputElement).files || [])
        );
      })
    )
  );

  ngOnInit() {
    this.stageFilesSelectionEffect();
  }

  public fileInput = viewChild<ElementRef>('fileInput');

  public cameraInput = viewChild<ElementRef>('cameraInput');

  public onCameraTrigger() {
    this.cameraInput()?.nativeElement?.click();
  }

  public onFileSelectionTrigger() {
    this.fileInput()?.nativeElement?.click();
  }

  public onPhotoRemove(index: number) {
    this.store.removeStagedFile(index);
  }
}
