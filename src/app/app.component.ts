import { Component, ViewChild } from '@angular/core';
import { CfDespesaModalComponent } from './cf-despesa-modal/cf-despesa-modal.component';
import { CfImportarModalComponent } from './cf-importar-modal/cf-importar-modal.component';
import { CfPreferenciasModalComponent } from './cf-preferencias-modal/cf-preferencias-modal.component';
import { CfRateioModalComponent } from './cf-rateio-modal/cf-rateio-modal.component';
import { CfStatusRateioComponent } from './cf-status-rateio/cf-status-rateio.component';
import { CfTransactionTableComponent } from './cf-transaction-table/cf-transaction-table.component';
import { GraficoCategoriaComponent } from './grafico-categoria/grafico-categoria.component';
import { GraficoTransacaoAnoComponent } from './grafico-transacao-ano/grafico-transacao-ano.component';
import { DespesaPessoa } from './services/rateio/despesaPessoa';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'controle-financeiro-ui';
  @ViewChild(CfDespesaModalComponent, {static: false}) despesaModal!: CfDespesaModalComponent;
  @ViewChild(CfImportarModalComponent, {static: false}) importModal!: CfImportarModalComponent;
  @ViewChild(CfRateioModalComponent, {static: false})   rateioModal!: CfRateioModalComponent;
  @ViewChild(CfTransactionTableComponent, {static: false}) transactionTable!: CfTransactionTableComponent;
  @ViewChild(GraficoCategoriaComponent, {static: false}) graficoCategoria!: GraficoCategoriaComponent;
  @ViewChild(GraficoTransacaoAnoComponent, {static: false}) graficoDespesaAno!: GraficoTransacaoAnoComponent;
  @ViewChild(CfStatusRateioComponent, {static: false}) cardRateio!: CfStatusRateioComponent;
  @ViewChild(CfPreferenciasModalComponent, {static: false}) preferenciasModal!: CfPreferenciasModalComponent;
  


  dataInicio:Date = new Date()
  dataFim:Date = new Date(this.dataInicio.getFullYear(),(this.dataInicio.getMonth()+1),this.dataInicio.getDay())

  constructor(){}

  abrirModal(evento:string){
    // alert(evento);
    switch (evento) {
      case "inserirDespesa":
          this.despesaModal.openModalWithComponent();
        break;
      case "importarDespesa":
          this.importModal.openModalWithComponent();
        break;
      case "categoriaModal":
          this.preferenciasModal.openModalWithComponent("categoria");
        break;
      case "formaPagtoModal":
          this.preferenciasModal.openModalWithComponent("formaPagto");
        break;
      
  }  
}

openModalRateio(evento:any){ 

    let pessoa = evento.pessoa;
    let mes = evento.mes
    let ano = evento.ano

    this.rateioModal.openModalWithComponent(pessoa,mes,ano);
}

atualizaDados(){
  this.transactionTable.buscaListaDespesa(this.dataInicio,this.dataFim, 1,10);
  this.graficoCategoria.buscaDepesasConsolidadoCategoria((this.dataFim.getMonth()+1),this.dataFim.getFullYear());
  this.graficoDespesaAno.buscaDespesaPorMes(this.dataFim.getFullYear());
  this.cardRateio.buscarRateioPessoa((this.dataFim.getMonth()+1),this.dataFim.getFullYear());
}

getUpdateDates(datas:Date[]){
  this.dataInicio = datas[0]
  this.dataFim = datas[1]
  this.atualizaDados();
}






}
