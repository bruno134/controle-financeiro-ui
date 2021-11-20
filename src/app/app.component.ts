import { Component, ViewChild } from '@angular/core';
import { CfDespesaModalComponent } from './cf-despesa-modal/cf-despesa-modal.component';
import { CfImportarModalComponent } from './cf-importar-modal/cf-importar-modal.component';
import { CfStatusRateioComponent } from './cf-status-rateio/cf-status-rateio.component';
import { CfTransactionTableComponent } from './cf-transaction-table/cf-transaction-table.component';
import { GraficoCategoriaComponent } from './grafico-categoria/grafico-categoria.component';
import { GraficoTransacaoAnoComponent } from './grafico-transacao-ano/grafico-transacao-ano.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'controle-financeiro-ui';
  @ViewChild(CfDespesaModalComponent, {static: false}) despesaModal!: CfDespesaModalComponent;
  @ViewChild(CfImportarModalComponent, {static: false}) importModal!: CfImportarModalComponent;
  @ViewChild(CfTransactionTableComponent, {static: false}) transactionTable!: CfTransactionTableComponent;
  @ViewChild(GraficoCategoriaComponent, {static: false}) graficoCategoria!: GraficoCategoriaComponent;
  @ViewChild(GraficoTransacaoAnoComponent, {static: false}) graficoDespesaAno!: GraficoTransacaoAnoComponent;
  @ViewChild(CfStatusRateioComponent, {static: false}) cardRateio!: CfStatusRateioComponent;


  mes:number;
  ano:number;

  constructor(){
    let dataAtual = new Date();
    this.mes = dataAtual.getMonth()+1;
    this.ano = dataAtual.getFullYear();
  }

  abrirModal(evento:string){
    switch (evento) {
      case "inserirDespesa":
          this.despesaModal.openModalWithComponent();
        break;
      case "importarDespesa":
          this.importModal.openModalWithComponent();
        break;
  }  
}

atualizaDados(){
  this.transactionTable.buscaListaDespesa(1);
  this.graficoCategoria.buscaDepesasConsolidadoCategoria(this.mes,this.ano);
  this.graficoDespesaAno.buscaDespesaPorMes(this.ano);
  this.cardRateio.buscarRateioPessoa(this.mes,this.ano);
}






}
