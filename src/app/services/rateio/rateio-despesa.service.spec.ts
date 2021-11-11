import { TestBed } from '@angular/core/testing';

import { RateioDespesaService } from './rateio-despesa.service';

describe('RateioDespesaService', () => {
  let service: RateioDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateioDespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
