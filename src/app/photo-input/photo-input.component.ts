import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.scss'],
  standalone: true,
})
export class PhotoInputComponent implements OnInit {
  ngOnInit() {
    console.log(this.fileInput());
    fromEvent(this.fileInput()?.nativeElement, 'change').subscribe(console.log);
  }

  public fileInput = viewChild<ElementRef>('fileInput');

  public onFileSelectionTrigger() {
    console.log(this.fileInput());
    this.fileInput()?.nativeElement?.click()
    
  }

  public onFilesSelected(event: any) {
    console.log('onFileSelected', { event });
  }

  onFileUploaded(event: any) {
    console.log('onFileUploaded', { event });
  }
}
