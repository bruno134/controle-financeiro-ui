import { TestBed } from '@angular/core/testing';

import { OrigemService } from './origem.service';

describe('OrigemService', () => {
  let service: OrigemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrigemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
