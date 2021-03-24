import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';

import { FormsModule } from "@angular/forms";
import { ListeProductComponent } from './liste-product/liste-product.component';
import { HeaderComponent } from './header/header.component';

import { ChartsModule } from "ng2-charts";
import { BarChartComponent } from './chart/bar-chart/bar-chart.component';
import { DonutChartComponent } from './chart/donut-chart/donut-chart.component';
import { PieChartComponent } from './chart/pie-chart/pie-chart.component';
import { LineChartComponent } from './chart/line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsProductComponent,
    HomeComponent,
    ListeProductComponent,
    HeaderComponent,
    BarChartComponent,
    DonutChartComponent,
    PieChartComponent,
    LineChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
