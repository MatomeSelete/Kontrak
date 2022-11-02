import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorTrackerComponent } from './contractor-tracker.component';

describe('ContractorTrackerComponent', () => {
  let component: ContractorTrackerComponent;
  let fixture: ComponentFixture<ContractorTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
