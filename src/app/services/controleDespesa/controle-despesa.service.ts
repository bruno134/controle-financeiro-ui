import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DespesaPorMes } from 'src/app/grafico-transacao-ano/despesaPorMes';
import { ListaConsolidadoPorCategoria } from './listaConsolidadoPorCategoria';

@Injectable({
  providedIn: 'root'
})
export class ControleDespesaService {

  constructor(private http: HttpClient) { }

  buscaDespesaConsolidadoPorCategoria(mes:number,ano:number) {
    return this.http.get<ListaConsolidadoPorCategoria>('http://localhost:8080/dash/consultar', {
      params: {
        mes: mes,
        ano: ano
      }});
    }

  buscaDespesaConsolidadaPorMes(ano:number){
    return this.http.get<DespesaPorMes[]>('http://localhost:8080/dash/totalconsolidadodespesa',{
      params: {
        ano:ano
      }
    });
  }
}
