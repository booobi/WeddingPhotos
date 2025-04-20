import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  standalone: true,

})
export class FileInputComponent implements OnInit {
  ngOnInit() {}

  onFileSelected(event: any) {
    console.log('onFileSelected', { event });
  }

  onFileUploaded(event: any) {
    console.log('onFileUploaded', { event });
  }
}
