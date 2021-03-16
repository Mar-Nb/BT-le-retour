import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-liste-product',
  templateUrl: './liste-product.component.html',
  styleUrls: ['./liste-product.component.css']
})
export class ListeProductComponent implements OnInit {

  produits: any;

  crustaces: any; // Category : 2
  fruitsDeMer: any;  // Category : 1
  poissons: any; // Category : 0

  valeur: any;

  constructor(public prodService: ProductsService, public stockService: StockService) {
    this.produits = [];
    this.crustaces = [];
    this.fruitsDeMer = [];
    this.poissons = [];
  }

  ngOnInit(): void {
    this.prodService.getData().subscribe(
      (res) => {
        this.produits = res;
        this.repartitionCategorie();
      },
      (err) => { alert("Failed loading JSON data : " + err.message); }
    );
  }

  repartitionCategorie() {
    // Répartition dans les différents tableaux
    this.produits.forEach(e => {
      switch (e.category) {
        case 0:
          this.poissons.push(e);
          break;
        case 1:
          this.fruitsDeMer.push(e);
          break;
        case 2:
          this.crustaces.push(e);
          break;
      }
    });
  }

  changerStock(type: string, i: number, id: number) {
    const val = parseInt((document.getElementById("stock" + id) as HTMLInputElement).value);
    if (val != null) {
      let oldval: number;
      switch (type) {
        case "poisson":
          oldval = this.poissons[i].quantityInStock;
          if (val < 0 && -val < oldval) { this.stockService.diminuerStock(this.poissons[i].id, -val).subscribe(); }
          else if (val > 0) { this.stockService.augmenterStock(this.poissons[i].id, val).subscribe(); }
          break;

        case "fruit":
          oldval = this.fruitsDeMer[i].quantityInStock;
          if (val < 0 && -val < oldval) { this.stockService.diminuerStock(this.fruitsDeMer[i].id, -val).subscribe(); }
          else if (val > 0) { this.stockService.augmenterStock(this.fruitsDeMer[i].id, val).subscribe(); }
          break;

        case "crustace":
          oldval = this.crustaces[i].quantityInStock;
          if (val < 0 && -val < oldval) { this.stockService.diminuerStock(this.crustaces[i].id, -val).subscribe(); }
          else if (val > 0) { this.stockService.augmenterStock(this.crustaces[i].id, val).subscribe(); }
          break;
      }
    }
  }

  rafraichir() { window.location.reload(); }
}
