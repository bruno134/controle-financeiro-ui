import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'cf-grafico-categoria',
  templateUrl: './grafico-categoria.component.html',
  styleUrls: ['./grafico-categoria.component.css']
})
export class GraficoCategoriaComponent implements OnInit {

/** variaveis */

chartLabels = ['LAZER', 'SUPERMERCADO', 'SAUDE'];
chartValues = [3,4,5]
chartData: any;
myChart: any;

  constructor() { }

  ngOnInit(): void {
    this.montaChart();
  }

  montaChart() {

    this.chartLabels = ['LAZER', 'SUPERMERCADO', 'SAUDE','EDUCACAO','VEICULO'];
    this.chartValues = [3, 5, 8,10,13];

    this.chartData = {
      labels: this.chartLabels,
      datasets: [{
        label: 'My First Dataset',
        data: this.chartValues,
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

}
