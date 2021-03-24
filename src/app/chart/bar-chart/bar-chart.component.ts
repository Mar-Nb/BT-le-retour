import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartType = "bar";
  barChartLegend = true;
  barChartLabels = ["2006", "2007", "2008", "2009", "2010", "2011", "2012"];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Série A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Série B" }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
