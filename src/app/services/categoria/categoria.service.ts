import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  buscaListaCategoria(){
    return this.http.get<Categoria[]>('http://localhost:8080/categoria/consultar');
  }

  salvarCategoria(categoria:Categoria){
    return this.http.post('http://localhost:8080/categoria/inserir',categoria);
  }

}
