import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DespesaPessoa } from '../services/rateio/despesaPessoa';
import { RateioDespesaService } from '../services/rateio/rateio-despesa.service';

@Component({
  selector: 'cf-status-rateio',
  templateUrl: './cf-status-rateio.component.html',
  styleUrls: ['./cf-status-rateio.component.css']
})
export class CfStatusRateioComponent implements OnInit {
  @Output() openRateioEvent = new EventEmitter()

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
  }

  buscarRateioPessoa(mes:number,ano:number){

     this.mes = mes
     this.ano = ano

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

  openRateioModal(pessoa:DespesaPessoa,mes:number,ano:number){
   
    let evento = { pessoa:pessoa,
                   mes:mes,
                   ano:ano}

    this.openRateioEvent.emit(evento);
  }

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
