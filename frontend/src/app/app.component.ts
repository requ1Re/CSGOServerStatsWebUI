import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '1337Frankfurt CS:GO Servers';

  ngOnInit(): void {
      document.title = this.title;
  }
}
