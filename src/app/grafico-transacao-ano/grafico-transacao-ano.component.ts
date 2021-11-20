import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ControleDespesaService } from '../services/controleDespesa/controle-despesa.service';
import { DespesaPorMes } from './despesaPorMes';

@Component({
  selector: 'cf-grafico-transacao-ano',
  templateUrl: './grafico-transacao-ano.component.html',
  styleUrls: ['./grafico-transacao-ano.component.css']
})
export class GraficoTransacaoAnoComponent implements OnInit {

  
  chartLabels:string[] = [];
  chartValues:string[] = [];
  chartData: any;
  barChart: any;
  labelsChart: any;
  ano:number;


  constructor(private controleDespesaService:ControleDespesaService) {
    this.ano = new Date().getFullYear();
   }

  ngOnInit(): void {
    this.montaChart();
    this.buscaDespesaPorMes(this.ano);
  }


  buscaDespesaPorMes(ano:number){
    this.controleDespesaService.buscaDespesaConsolidadaPorMes(ano).subscribe(
      despesasMes => {
        this.separaDadosGrafico(despesasMes)
        //this.montaChart(this.chartLabels,this.chartValues);
        this.insereDadosGrafico(this.chartLabels,this.chartValues)
      },
      erro => {
        console.log(erro);
      }
    );
  }

  separaDadosGrafico(despesasMes:DespesaPorMes[]){
    if(despesasMes){
      this.chartLabels = [];
      this.chartValues = [];
      despesasMes.forEach(despesa => {
        this.chartLabels.push(despesa.mesDespesa)
        this.chartValues.push(despesa.valorTotalMes)
      } );
    }
  }

  montaChart( ) {   
    this.chartData = {
      labels: [],
      datasets: [{
        label: '2021',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }]
    };

    let delayed = true;
    this.barChart = new Chart("canvasBarChart",
      {
        type: 'bar',
        data: this.chartData,
        options: {
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              return delay;
            },
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Total Despesa por Mes'
            }
          }
        },
      }
    );
  }

  insereDadosGrafico(chartLabels:string[],chartValues:string[] ){
    this.barChart.data.labels = chartLabels;
    this.barChart.data.datasets[0].data = chartValues;
    this.barChart.update();
  }

}
