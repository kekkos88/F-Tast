import { TestBed } from '@angular/core/testing';

import { PianoGiornalieroService } from './piano-giornaliero.service';

describe('PianoGiornalieroService', () => {
  let service: PianoGiornalieroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PianoGiornalieroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
