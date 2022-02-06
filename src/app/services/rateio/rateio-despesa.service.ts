import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RateioDespesa } from './despesaRateio';
import { ListaDespesaPessoa } from './listaDespesaPessoa';
import { RateioDespesaDTO } from './rateioDespesaDTO';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class RateioDespesaService {

  constructor(private http: HttpClient) { }

  buscaListaRateio(){
    return this.http.get<RateioDespesa[]>(API + '/tipo_rateio/consultar');
  }

  buscaDespesaPorPessoa(mes:number, ano:number) {
    return this.http.get<ListaDespesaPessoa>(API + '/dash/calculo', {
      params: {
        mes: mes,
        ano: ano
      }
    })
  }

  alteraValorRateio(rateioDTO:RateioDespesaDTO){
    return this.http.put(API + '/rateio/alterar',rateioDTO);
  }
}
