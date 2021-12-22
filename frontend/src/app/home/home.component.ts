import { Component, OnInit } from '@angular/core';
import { faCopy, faPlayCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faCopy = faCopy;
  faPlayCircle = faPlayCircle;

  gamemodes: ServerDisplay[] = [
    {
      name: 'Retakes #1',
      imgPath: '/assets/img/retakes.jpg',
      ip: '94.130.22.111:27015'
    },
    {
      name: 'KZ #1',
      imgPath: '/assets/img/kz.jpg',
      ip: '94.130.22.111:27016'
    },
    {
      name: 'Surf #1',
      imgPath: '/assets/img/surf_utopia_v3.jpg',
      ip: '94.130.22.111:27017'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  copyToClipboard(ip: string){
    navigator.clipboard.writeText(ip)
        .then(() => {
        console.log("Copied IP!")
    })
        .catch(err => {
        console.log('Something went wrong', err);
    })
  }

}

interface ServerDisplay {
  name: string;
  imgPath: string;
  ip: string;
}