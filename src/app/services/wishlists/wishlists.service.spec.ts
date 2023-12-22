import { TestBed } from '@angular/core/testing';

import { WishlistsService } from './wishlists.service';

describe('WishlistsService', () => {
  let service: WishlistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
