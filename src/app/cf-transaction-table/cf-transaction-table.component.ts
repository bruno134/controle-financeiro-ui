import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DespesasService } from '../services/despesa/despesas.service';
import { Despesa } from '../services/despesa/despesa';
import Swal from 'sweetalert2';


@Component({
  selector: 'cf-transaction-table',
  templateUrl: './cf-transaction-table.component.html',
  styleUrls: ['./cf-transaction-table.component.css']
})
export class CfTransactionTableComponent implements OnInit {
@Input() listaDespesa:Despesa[] = [];
@Input() headers:string[] =  ["#", "Data", "Descrição", "Valor", "Categoria", "Origem Despesa", "Rateio"];
@Output() deleteEvent = new EventEmitter();

/* váriaveis */
paginaAnterior:number = 0;
proximaPagina:number = 0;
paginaAtual:number = 0;
totalDePaginas:number = 0;
smallnumPages:number = 0;
currentPage:number = 0;
dataInicio:Date;
dataFim:Date;


  constructor(private despesaService:DespesasService) { 
    let dataAtual = new Date();
    this.dataInicio = dataAtual;
    this.dataFim = new Date(dataAtual.getFullYear(),(dataAtual.getMonth()+1),dataAtual.getDay());
  }

  ngOnInit(): void {
    
  }

  buscaListaDespesa(dataInicial:Date,dataFinal:Date,pagina: number) {
    
    let mes = dataFinal.getMonth()+1;
    let ano = dataFinal.getFullYear();

    if (pagina) {
      this.listaDespesa = []
      if (pagina==0) pagina = 1
      this.despesaService.consultaListaDespesa(mes, ano, pagina).subscribe(service => {
        this.listaDespesa = service.despesas;
        this.proximaPagina = service.proximaPagina;
        this.paginaAnterior = service.paginaAnterior != null ? service.paginaAnterior : 0;
        this.paginaAtual = this.paginaAnterior + 1;
        this.totalDePaginas = service.totalPaginas;
        this.dataInicio = dataInicial
        this.dataFim = dataFinal
      });
    }
  }

  buscaProximaPagina(pagina:number){
    this.buscaListaDespesa(this.dataInicio, this.dataFim, pagina)
  }

  buscaPaginaAnterior(pagina:number){
    this.buscaListaDespesa(this.dataInicio, this.dataFim, pagina)
  }

  apagarDespesa(id:number){
    
    this.despesaService.apagaDespesa(id).subscribe(
      () => {
        this.deleteEvent.emit(true);
      },
      erro => console.error(erro)
    )
  }

  mostrarAlertaDelecao(id:number){
    Swal.fire({
      icon: 'question',
      title: 'Deseja apagar despesa?',
      showDenyButton: true,
      confirmButtonText: 'Apagar',
      denyButtonText: `Mudei de ideia`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.apagarDespesa(id);
        Swal.fire('Apagado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Ação cancelada', '', 'info')
      }
    })
   
  }

}
