import { TestBed } from '@angular/core/testing';

import { PixelScreenService } from './pixel-screen.service';

describe('PixelScreenService', () => {
  let service: PixelScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PixelScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
