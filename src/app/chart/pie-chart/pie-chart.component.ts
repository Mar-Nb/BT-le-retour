import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  pieChartType = "pie";
  pieChartLabels = [
    "Ventes 1er trimestre",
    "Ventes 2e trimestre",
    "Ventes 3e trimestre",
    "Ventes 4e trimestre"
  ];
  pieChartData = [120, 150, 180, 90];

  constructor() { }

  ngOnInit(): void {
  }

}
