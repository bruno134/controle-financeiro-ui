import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTransacaoAnoComponent } from './grafico-transacao-ano.component';

describe('GraficoTransacaoAnoComponent', () => {
  let component: GraficoTransacaoAnoComponent;
  let fixture: ComponentFixture<GraficoTransacaoAnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoTransacaoAnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTransacaoAnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
