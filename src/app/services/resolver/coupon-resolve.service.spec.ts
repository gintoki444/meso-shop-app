import { TestBed } from '@angular/core/testing';

import { CouponResolveService } from './coupon-resolve.service';

describe('CouponResolveService', () => {
  let service: CouponResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
