import { TestBed } from '@angular/core/testing';

import { MisurazioniService } from './misurazioni.service';

describe('MisurazioniService', () => {
  let service: MisurazioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisurazioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
