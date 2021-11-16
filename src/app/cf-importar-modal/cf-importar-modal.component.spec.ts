import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfImportarModalComponent } from './cf-importar-modal.component';

describe('CfImportarModalComponent', () => {
  let component: CfImportarModalComponent;
  let fixture: ComponentFixture<CfImportarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfImportarModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfImportarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
