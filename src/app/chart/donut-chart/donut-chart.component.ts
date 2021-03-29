import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  donutChartType = "doughnut";
  donutChartLabels = [
    "Ventes 1er trimestre",
    "Ventes 2e trimestre",
    "Ventes 3e trimestre",
    "Ventes 4e trimestre"
  ];
  donutChartData = [120, 150, 180, 90];

  constructor() { }

  ngOnInit(): void {
  }

}
