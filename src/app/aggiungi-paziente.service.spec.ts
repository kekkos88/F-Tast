import { TestBed } from '@angular/core/testing';

import { AggiungiPazienteService } from './aggiungi-paziente.service';

describe('AggiungiPazienteService', () => {
  let service: AggiungiPazienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggiungiPazienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
