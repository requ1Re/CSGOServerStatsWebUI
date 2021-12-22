import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  open = false;

  links: NavbarItem[] = [
    {
      name: 'Home',
      url: ['/home']
    },
    {
      name: 'Stats',
      url: ['/stats']
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

interface NavbarItem {
  name: string;
  url: string[];
}