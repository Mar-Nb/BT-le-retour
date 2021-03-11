import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsProductComponent } from "./details-product/details-product.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "detailsProduit", component: DetailsProductComponent },
  { path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
