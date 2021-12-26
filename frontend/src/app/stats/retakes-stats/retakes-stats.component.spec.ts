import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetakesStatsComponent } from './retakes-stats.component';

describe('RetakesStatsComponent', () => {
  let component: RetakesStatsComponent;
  let fixture: ComponentFixture<RetakesStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetakesStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetakesStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
