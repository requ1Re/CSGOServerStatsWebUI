import { Component, OnInit } from '@angular/core';
import { faFacebook, faInstagram, faSteam, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { ConfigUtil } from '../../utils/ConfigUtil';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faSteam = faSteam;

  footerItems = ConfigUtil.GLOBALS.FOOTER_ITEMS;

  constructor() { }

  ngOnInit(): void {
  }

  showSeperator(index: number): boolean {
    return index !== this.footerItems.length - 1;
  }

}
