import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsultaDespesa } from './consultaDespesa';
import { Despesa } from './despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesasService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit(){}

  consultaListaDespesa(mes:number, ano:number, pagina:number,tamanhoPagina:number){
    return this.http.get<ConsultaDespesa> ('http://localhost:8080/despesa/consultar', {
      params: {
        mes: mes,
        ano: ano,
        pagina: pagina,
        tamanhoPagina: tamanhoPagina
      }
    })
  }

  apagaDespesa(item: number) {
    return this.http.delete('http://localhost:8080/despesa/apagar/' + item);
  }

  incluir(despesa:Despesa) {
    return this.http.post<Despesa>('http://localhost:8080/despesa/inserir', despesa);
  }

  importarDespesa(formData:FormData) {
    return this.http.post< Despesa[]>('http://localhost:8080/despesa/import', formData);
  }

  incluirLote(lista: Despesa[]) {
    return this.http.post('http://localhost:8080/despesa/inserir/lista', lista)
  }


}
