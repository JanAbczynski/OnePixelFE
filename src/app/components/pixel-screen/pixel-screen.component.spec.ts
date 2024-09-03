import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelScreenComponent } from './pixel-screen.component';

describe('PixelScreenComponent', () => {
  let component: PixelScreenComponent;
  let fixture: ComponentFixture<PixelScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
