import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RateioDespesa } from './despesaRateio';
import { ListaDespesaPessoa } from './listaDespesaPessoa';


@Injectable({
  providedIn: 'root'
})
export class RateioDespesaService {

  constructor(private http: HttpClient) { }

  buscaListaRateio(){
    return this.http.get<RateioDespesa[]>('http://localhost:8080/tipo_rateio/consultar');
  }

  buscaDespesaPorPessoa(mes:number, ano:number) {
    return this.http.get<ListaDespesaPessoa>('http://localhost:8080/dash/calculo', {
      params: {
        mes: mes,
        ano: ano
      }
    })
  }
}
