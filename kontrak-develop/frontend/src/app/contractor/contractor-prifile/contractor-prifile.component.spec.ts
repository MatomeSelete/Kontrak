import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorPrifileComponent } from './contractor-prifile.component';

describe('ContractorPrifileComponent', () => {
  let component: ContractorPrifileComponent;
  let fixture: ComponentFixture<ContractorPrifileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorPrifileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorPrifileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
