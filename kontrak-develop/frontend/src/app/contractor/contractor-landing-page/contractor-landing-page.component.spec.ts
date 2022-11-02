import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorLandingPageComponent } from './contractor-landing-page.component';

describe('ContractorLandingPageComponent', () => {
  let component: ContractorLandingPageComponent;
  let fixture: ComponentFixture<ContractorLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
