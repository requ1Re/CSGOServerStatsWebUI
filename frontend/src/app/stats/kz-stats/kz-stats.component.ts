import { Component, OnInit } from '@angular/core';
import { StatsBaseComponent } from 'src/app/shared/components/stats-base/stats-base.component';

@Component({
  selector: 'app-kz-stats',
  templateUrl: './kz-stats.component.html',
  styleUrls: ['./kz-stats.component.css'],
})
export class KzStatsComponent extends StatsBaseComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
