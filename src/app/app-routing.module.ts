import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsProductComponent } from "./details-product/details-product.component";
import { HomeComponent } from "./home/home.component";
import { ListeProductComponent } from './liste-product/liste-product.component';

const routes: Routes = [
  { path: "detailsProduit", component: DetailsProductComponent },
  { path: "", component: HomeComponent },
  { path: "listeProduit", component: ListeProductComponent },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
