import { TestBed } from '@angular/core/testing';

import { DateUtilsService } from './dateUtils.service';

describe('DateServiceService', () => {
  let service: DateUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
