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

  constructor(private rateioService:RateioDespesaService) { 
    let dataAtual = new Date();
    this.mes = dataAtual.getMonth()+1;
    this.ano = dataAtual.getFullYear();

  }

  ngOnInit(): void {
    this.buscarRateioPessoa(this.mes,this.ano);
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


}
