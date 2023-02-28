import { TestBed } from '@angular/core/testing';

import { RegistraPazienteService } from './registra-paziente.service';

describe('RegistraPazienteService', () => {
  let service: RegistraPazienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistraPazienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
