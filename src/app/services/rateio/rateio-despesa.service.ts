import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RateioDespesa } from './RateioDespesa';

@Injectable({
  providedIn: 'root'
})
export class RateioDespesaService {

  constructor(private http: HttpClient) { }

  buscaListaRateio(){
    return this.http.get<RateioDespesa[]>('http://localhost:8080/tipo_rateio/consultar');
  }
}
