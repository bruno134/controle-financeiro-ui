import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfDespesaModalComponent } from './cf-despesa-modal.component';

describe('CfDespesaModalComponent', () => {
  let component: CfDespesaModalComponent;
  let fixture: ComponentFixture<CfDespesaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfDespesaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfDespesaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
