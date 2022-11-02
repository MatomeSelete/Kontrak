import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorDashboardComponent } from './contractor-dashboard.component';

describe('ContractorDashboardComponent', () => {
  let component: ContractorDashboardComponent;
  let fixture: ComponentFixture<ContractorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
