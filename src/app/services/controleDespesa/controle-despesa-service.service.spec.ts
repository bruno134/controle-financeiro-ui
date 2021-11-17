import { TestBed } from '@angular/core/testing';

import { ControleDespesaService } from './controle-despesa.service';

describe('ControleDespesaServiceService', () => {
  let service: ControleDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleDespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
