import { Component, OnInit } from '@angular/core';
import { NavbarItem } from '../../models/NavbarItem';
import { ConfigUtil } from '../../utils/ConfigUtil';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  open = false;

  links: NavbarItem[] = ConfigUtil.GLOBALS.NAVBAR_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

}

