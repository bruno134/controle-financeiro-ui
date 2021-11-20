import { Component, OnInit } from '@angular/core';
import { DespesaPessoa } from '../services/rateio/DespesaPessoa';
import { RateioDespesaService } from '../services/rateio/rateio-despesa.service';

@Component({
  selector: 'cf-status-rateio',
  templateUrl: './cf-status-rateio.component.html',
  styleUrls: ['./cf-status-rateio.component.css']
})
export class CfStatusRateioComponent implements OnInit {

  mes:number;
  ano:number;
  listaDepesaPessoa:DespesaPessoa[] = [];
  valorCompartilhado:string = "0";
  descricaoValorCompartilhado = "COMPARTILHADA";
  valorPercentual:number = 0;
  corDaBarra:string = "";
  barra:string = "";

  constructor(private rateioService:RateioDespesaService) { 
    let dataAtual = new Date();
    this.mes = dataAtual.getMonth()+1;
    this.ano = dataAtual.getFullYear();

  }

  ngOnInit(): void {
    this.buscarRateioPessoa(this.mes,this.ano);
    // this.valorPercentual = this.calculoBarra(100,6000);
    // this.barra = this.valorPercentual + "%";
    // this.corDaBarra = this.corBarra(this.valorPercentual);
  }

  buscarRateioPessoa(mes:number,ano:number){
      this.rateioService.buscaDespesaPorPessoa(mes,ano).subscribe(
        listaDespesaPessoa => {
          this.listaDepesaPessoa = listaDespesaPessoa.itens
          this.descricaoValorCompartilhado = listaDespesaPessoa.descricaoDespesaCompartilhada
          this.valorCompartilhado = listaDespesaPessoa.valorTotalDespesaCompartilhada;
        },
         erro => {
            console.log(erro);
         }
      );
  }


  /*
  100  - offset     100*vl  = x * offset  => x 100*vl/offset
   x  - vl
  */ 

  calculoBarra(valorAtual:number,valorOffSet:number){
    return (valorAtual*100/valorOffSet);
  }

  calculoBarraString(valorAtual:number,valorOffSet:number){
      return this.calculoBarra(valorAtual,valorOffSet)+"%"
  }

  corBarra(percentual:number){

    if(percentual>67)
      return "red";
    if(percentual>34)
      return "yellow";
    else  
      return "green";

  }

}
