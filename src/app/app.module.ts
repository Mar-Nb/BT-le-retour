import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';

import { FormsModule } from "@angular/forms";
import { ListeProductComponent } from './liste-product/liste-product.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsProductComponent,
    HomeComponent,
    ListeProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
