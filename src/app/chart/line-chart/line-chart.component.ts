import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  lineChartType = "line";
  lineChartLegend = true;
  lineChartLabels = ["2006", "2007", "2008", "2009", "2010", "2011", "2012"];

  lineChartOptions = {
    responsive: true
  };

  lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Série A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Série B" }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
