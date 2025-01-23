import { TestBed } from '@angular/core/testing';

import { FahrenheitService } from './fahrenheit.service';

describe('FahrenheitService', () => {
  let service: FahrenheitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FahrenheitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
