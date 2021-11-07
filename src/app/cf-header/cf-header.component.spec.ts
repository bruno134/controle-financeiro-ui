import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfHeaderComponent } from './cf-header.component';

describe('CfHeaderComponent', () => {
  let component: CfHeaderComponent;
  let fixture: ComponentFixture<CfHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
