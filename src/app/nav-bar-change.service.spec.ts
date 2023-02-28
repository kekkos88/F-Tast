import { TestBed } from '@angular/core/testing';

import { NavBarChangeService } from './nav-bar-change.service';

describe('NavBarChangeService', () => {
  let service: NavBarChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavBarChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
