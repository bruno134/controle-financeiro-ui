import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaDespesa } from './consultaDespesa';
import { Despesa } from './despesa';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl

@Injectable({
  providedIn: 'root'
})
export class DespesasService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(){}

  consultaListaDespesa(mes:number, ano:number, pagina:number,tamanhoPagina:number){
    return this.http.get<ConsultaDespesa> (API + '/despesa/consultar', {
      params: {
        mes: mes,
        ano: ano,
        pagina: pagina,
        tamanhoPagina: tamanhoPagina
      }
    })
  }

  apagaDespesa(item: number) {
    return this.http.delete(API + '/despesa/apagar/' + item);
  }

  incluir(despesa:Despesa) {
    return this.http.post<Despesa>(API + '/despesa/inserir', despesa);
  }

  importarDespesa(formData:FormData) {
    return this.http.post< Despesa[]>(API + '/despesa/import', formData);
  }

  incluirLote(lista: Despesa[]) {
    return this.http.post(API + '/despesa/inserir/lista', lista)
  }


}
