import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from './categoria';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  buscaListaCategoria(){
    return this.http.get<Categoria[]>(API + '/categoria/consultar');
  }

  salvarCategoria(categoria:Categoria){
    return this.http.post( API + '/categoria/inserir',categoria);
  }

}
