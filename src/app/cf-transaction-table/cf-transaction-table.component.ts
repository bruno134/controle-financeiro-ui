import { Component, Input, OnInit } from '@angular/core';
import { DespesasService } from '../services/despesa/despesas.service';
import { Despesa } from '../services/despesa/despesa';

@Component({
  selector: 'cf-transaction-table',
  templateUrl: './cf-transaction-table.component.html',
  styleUrls: ['./cf-transaction-table.component.css']
})
export class CfTransactionTableComponent implements OnInit {
@Input() listaDespesa:Despesa[] = [];
@Input() headers:string[] =  ["#", "Data", "Descrição", "Valor", "Categoria", "Origem Despesa", "Rateio"];

/* váriaveis */
paginaAnterior:number = 0;
proximaPagina:number = 0;
paginaAtual:number = 0;
totalDePaginas:number = 0;
smallnumPages:number = 0;
currentPage:number = 0;


  constructor(private despesaService:DespesasService) { }

  ngOnInit(): void {
    this.buscaListaDespesa(1);
  }

  buscaListaDespesa(pagina: number) {
    
    //TODO deixar parametrizavel as buscas
    
    let dataAtual = new Date();
    let mes = dataAtual.getMonth()+1;
    let ano = dataAtual.getFullYear();

    if (pagina || pagina>0) {
      this.despesaService.consultaListaDespesa(mes, ano, pagina).subscribe(service => {
        this.listaDespesa = service.despesas;
        this.proximaPagina = service.proximaPagina;
        this.paginaAnterior = service.paginaAnterior != null ? service.paginaAnterior : 0;
        this.paginaAtual = this.paginaAnterior + 1;
        this.totalDePaginas = service.totalPaginas;
      });
    }
  }
}
