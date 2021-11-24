import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfPreferenciasModalComponent } from './cf-preferencias-modal.component';

describe('CfPreferenciasModalComponent', () => {
  let component: CfPreferenciasModalComponent;
  let fixture: ComponentFixture<CfPreferenciasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfPreferenciasModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfPreferenciasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
