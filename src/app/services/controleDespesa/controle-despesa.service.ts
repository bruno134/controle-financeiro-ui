import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DespesaPorMes } from 'src/app/grafico-transacao-ano/despesaPorMes';
import { environment } from 'src/environments/environment';
import { ListaConsolidadoPorCategoria } from './listaConsolidadoPorCategoria';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class ControleDespesaService {

  constructor(private http: HttpClient) { }

  buscaDespesaConsolidadoPorCategoria(mes:number,ano:number) {
    return this.http.get<ListaConsolidadoPorCategoria>( API + '/dash/consultar', {
      params: {
        mes: mes,
        ano: ano
      }});
    }

  buscaDespesaConsolidadaPorMes(ano:number){
    return this.http.get<DespesaPorMes[]>(API + '/dash/totalconsolidadodespesa',{
      params: {
        ano:ano
      }
    });
  }
}
