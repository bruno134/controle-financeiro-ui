import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfStatusRateioComponent } from './cf-status-rateio.component';

describe('CfStatusRateioComponent', () => {
  let component: CfStatusRateioComponent;
  let fixture: ComponentFixture<CfStatusRateioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfStatusRateioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfStatusRateioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
