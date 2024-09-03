import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassReseterComponent } from './pass-reseter.component';

describe('PassReseterComponent', () => {
  let component: PassReseterComponent;
  let fixture: ComponentFixture<PassReseterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassReseterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassReseterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
