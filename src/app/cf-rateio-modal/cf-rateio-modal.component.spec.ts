import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfRateioModalComponent } from './cf-rateio-modal.component';

describe('CfRateioModalComponent', () => {
  let component: CfRateioModalComponent;
  let fixture: ComponentFixture<CfRateioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfRateioModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfRateioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
