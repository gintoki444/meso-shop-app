import { TestBed } from '@angular/core/testing';

import { OmiseService } from './omise.service';

describe('OmiseService', () => {
  let service: OmiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
