import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.css'],
})
export class LicenseInfoComponent implements OnInit {
  filePath = '3rdpartylicenses.txt';

  licenseText = '';

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.http.get(this.filePath, { responseType: 'text' }).subscribe((data) => {
      this.licenseText = data;
      this.licenseText = this.licenseText.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.loadingService.hideLoading();
    });
  }
}
