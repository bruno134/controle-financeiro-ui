import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoCategoriaComponent } from './grafico-categoria.component';

describe('GraficoCategoriaComponent', () => {
  let component: GraficoCategoriaComponent;
  let fixture: ComponentFixture<GraficoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
