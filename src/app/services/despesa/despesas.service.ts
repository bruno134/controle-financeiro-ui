import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  consultaListaDespesa(mes:number, ano:number, pagina:number,tamanhoPagina:number, filter?:Map<string,string>){


    let params = new HttpParams()
    .set('mes', mes)
    .set('ano', ano)
    .set('pagina',pagina)
    .set('tamanhoPagina', tamanhoPagina);
    

    filter?.forEach((v,k) => {
      params = params.set(k,v);
    })

    console.log(params)

    return this.http.get<ConsultaDespesa> (API + '/despesa/consultar', {
     params
    })
  }

  apagaDespesa(item: number) {
    return this.http.delete(API + '/despesa/apagar/' + item);
  }

  incluir(despesa:Despesa) {
    return this.http.post<Despesa>(API + '/despesa/inserir', despesa);
  }

  importarDespesa(formData:FormData) {
    return this.http.post<ConsultaDespesa>(API + '/despesa/import', formData);
  }

  incluirLote(lista: Despesa[]) {
    return this.http.post(API + '/despesa/inserir/lista', lista)
  }


}
