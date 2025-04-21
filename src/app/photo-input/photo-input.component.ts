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

  public onFilesSelected(event: any) {
    console.log('onFileSelected', { event });
  }

  onFileUploaded(event: any) {
    console.log('onFileUploaded', { event });
  }
}
