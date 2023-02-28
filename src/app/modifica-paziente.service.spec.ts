import { TestBed } from '@angular/core/testing';

import { ModificaPazienteService } from './modifica-paziente.service';

describe('ModificaPazienteService', () => {
  let service: ModificaPazienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificaPazienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
