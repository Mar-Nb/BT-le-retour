import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartType = "bar";
  barChartLegend = true;

  @Input() barChartLabels: any;
  @Input() barChartData: ChartDataSets[];

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  constructor() { }

  ngOnInit(): void { }
}
