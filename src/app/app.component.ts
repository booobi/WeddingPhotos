import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'wedding-table-photos';

  ngOnInit(): void {
    new (window as any).fullpage('#fullpage', {
      autoScrolling:true,
      scrollHorizontally: true
  });
  }
}
