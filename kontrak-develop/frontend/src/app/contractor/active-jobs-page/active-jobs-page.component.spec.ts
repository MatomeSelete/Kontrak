import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveJobsPageComponent } from './active-jobs-page.component';

describe('ActiveJobsPageComponent', () => {
  let component: ActiveJobsPageComponent;
  let fixture: ComponentFixture<ActiveJobsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveJobsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveJobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
