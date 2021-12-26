import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfStatsComponent } from './surf-stats.component';

describe('SurfStatsComponent', () => {
  let component: SurfStatsComponent;
  let fixture: ComponentFixture<SurfStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurfStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
