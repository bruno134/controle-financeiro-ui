import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { or } from 'ajv/dist/compile/codegen';
import { environment } from 'src/environments/environment';
import { Origem } from './origem';

const API = environment.ApiUrl

@Injectable({
  providedIn: 'root'
})
export class OrigemService {

  constructor(private http: HttpClient) { }

  buscaListaOrigem(){
    return this.http.get<Origem[]>(API + '/instrumento/consultar');
  }

  salvaOrigem(origem:Origem){
    return this.http.post(API + '/instrumento/inserir',origem);
  }
}
