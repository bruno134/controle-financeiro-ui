import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ConsolidadoPorCategoria } from '../services/controleDespesa/consolidadoPorCategoria';
import { ControleDespesaService } from '../services/controleDespesa/controle-despesa.service';

@Component({
  selector: 'cf-grafico-categoria',
  templateUrl: './grafico-categoria.component.html',
  styleUrls: ['./grafico-categoria.component.css']
})
export class GraficoCategoriaComponent implements OnInit {

/** variaveis */

chartLabels:string[] = [];
chartValues:number[] = [];
mes:number;
ano:number;
chartData: any;
myChart: any;
listaConsolidadoCategoria:ConsolidadoPorCategoria[] = [];

  constructor(private controleService:ControleDespesaService) {
    let dataAtual = new Date();
    this.mes = dataAtual.getMonth()+1;
    this.ano = dataAtual.getFullYear();
   }

  ngOnInit(): void {
    this.buscaDepesasConsolidadoCategoria(this.mes,this.ano);
  }

  montaChart(chartLabels:string[],chartValues:number[] ) {
    this.chartData = {
      labels: chartLabels,
      datasets: [{
        label: 'Categorias',
        data: chartValues,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 204, 255)',
          'rgb(153, 255, 255)',
          'rgb(204, 204, 0)',
          'rgb(96, 96, 96)',
          'rgb(255, 204, 204)',
          'rgb(255, 229, 204)',
          'rgb(255, 255, 204)',
          'rgb(229, 255, 204)'
        ],
        hoverOffset: 4
      }]
    };

    this.myChart = new Chart("myChart",
      {
        type: 'pie',
        data: this.chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Despesas por categoria'
            }
          }
        },
      }
    );
  }

  buscaDepesasConsolidadoCategoria(mes:number,ano:number){
      this.controleService.buscaDespesaConsolidadoPorCategoria(mes,ano).subscribe(
        consolidadoCategoria => { 
          this.listaConsolidadoCategoria = consolidadoCategoria.itens
          this.separaDadosGrafico(this.listaConsolidadoCategoria);
          this.montaChart(this.chartLabels, this.chartValues);
        },
        erro => console.log(erro)
      );
  }

  separaDadosGrafico(listaConsolidada:ConsolidadoPorCategoria[]){
    if(listaConsolidada){
      listaConsolidada.forEach(item => {
        this.chartLabels.push(item.descricao);
        this.chartValues.push(+item.soma);
      })
    }
  }

}
