import { TestBed } from '@angular/core/testing';

import { SellerService } from './seller.service';

describe('SellerServiceService', () => {
  let service: SellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
