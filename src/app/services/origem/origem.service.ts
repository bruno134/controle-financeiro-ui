import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Origem } from './origem';

@Injectable({
  providedIn: 'root'
})
export class OrigemService {

  constructor(private http: HttpClient) { }

  buscaListaOrigem(){
    return this.http.get<Origem[]>('http://localhost:8080/instrumento/consultar');
  }
}
