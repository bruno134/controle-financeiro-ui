import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'cf-grafico-transacao-ano',
  templateUrl: './grafico-transacao-ano.component.html',
  styleUrls: ['./grafico-transacao-ano.component.css']
})
export class GraficoTransacaoAnoComponent implements OnInit {

  
  chartValues = [3,4,5]
  chartData: any;
  barChart: any;
  labelsChart: any;


  constructor() { }

  ngOnInit(): void {
    this.montaChart();
  }

  montaChart() {

    
   

    this.labelsChart = ["Janeiro","Fevereiro","Março", "Abril", "Maio"];
    this.chartValues = [10800, 0, 8049, 12381, 5600, 14455, 10040];
    this.chartData = {
      labels: this.labelsChart,
      datasets: [{
        label: '2021',
        data: this.chartValues,
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

}
