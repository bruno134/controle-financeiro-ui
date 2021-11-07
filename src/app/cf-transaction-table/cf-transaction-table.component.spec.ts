import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfTransactionTableComponent } from './cf-transaction-table.component';

describe('CfTransactionTableComponent', () => {
  let component: CfTransactionTableComponent;
  let fixture: ComponentFixture<CfTransactionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfTransactionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfTransactionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
