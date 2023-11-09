import { TestBed } from '@angular/core/testing';

import { AddressResolveService } from './address-resolve.service';

describe('AddressResolveService', () => {
  let service: AddressResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
