import { TestBed } from '@angular/core/testing';

import { IdShareService } from './id-share.service';

describe('IdShareService', () => {
  let service: IdShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
