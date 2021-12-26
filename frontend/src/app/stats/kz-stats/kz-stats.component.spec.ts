import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KzStatsComponent } from './kz-stats.component';

describe('KzStatsComponent', () => {
  let component: KzStatsComponent;
  let fixture: ComponentFixture<KzStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KzStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KzStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
