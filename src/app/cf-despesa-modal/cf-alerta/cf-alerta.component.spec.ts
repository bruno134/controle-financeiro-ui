import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfAlertaComponent } from './cf-alerta.component';

describe('CfAlertaComponent', () => {
  let component: CfAlertaComponent;
  let fixture: ComponentFixture<CfAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfAlertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
