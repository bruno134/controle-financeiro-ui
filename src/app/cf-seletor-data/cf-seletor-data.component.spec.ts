import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfSeletorDataComponent } from './cf-seletor-data.component';

describe('CfSeletorDataComponent', () => {
  let component: CfSeletorDataComponent;
  let fixture: ComponentFixture<CfSeletorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfSeletorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfSeletorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
