import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRegistrationComponent } from './finish-registration.component';

describe('FinishRegistrationComponent', () => {
  let component: FinishRegistrationComponent;
  let fixture: ComponentFixture<FinishRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
