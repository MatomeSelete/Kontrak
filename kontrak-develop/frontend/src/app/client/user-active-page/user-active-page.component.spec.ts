import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivePageComponent } from './user-active-page.component';

describe('UserActivePageComponent', () => {
  let component: UserActivePageComponent;
  let fixture: ComponentFixture<UserActivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActivePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
