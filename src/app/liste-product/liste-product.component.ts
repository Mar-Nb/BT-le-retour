import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { StockService } from '../services/stock.service';
import { TransactionService } from '../services/transaction.service';

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

  modifStock: any;
  modifPromo: any;
  transaction: any;

  constructor(public prodService: ProductsService, public stockService: StockService, public transacService: TransactionService) {
    this.produits = [];
    this.crustaces = [];
    this.fruitsDeMer = [];
    this.poissons = [];
    this.modifStock = [];
    this.modifPromo = [];
    this.transaction = [];
  }

  ngOnInit(): void {
    this.prodService.getData().subscribe(
      (res) => {
        this.produits = res;

        for (let p of this.produits) {
          if (p.sale && p.discount > 0) {
            p.price_on_sale = p.price * (1 - p.discount / 100);

            // Number.toFixed() permet de garder 2 décimales, mais renvoie un string
            p.price_on_sale = p.price_on_sale.toFixed(2);
          }
        }

        this.repartitionCategorie();
      },
      (err) => { alert("Failed loading JSON data : " + err.message); }
    );
  }

  repartitionCategorie() {
    // Répartition dans les différents tableaux
    this.produits.forEach(p => {
      switch (p.category) {
        case 0:
          this.poissons.push(p);
          break;
        case 1:
          this.fruitsDeMer.push(p);
          break;
        case 2:
          this.crustaces.push(p);
          break;
      }
    });
  }

  stockModif(id: number, oldval: number) {
    // Valeur récupérée dans le champ de modification de la page HTML
    const val = parseInt((document.getElementById("stock" + id) as HTMLInputElement).value);

    if (val != null && val != 0) { this.modifStock[id] = {"val": val, "oldval": oldval}; }
  }

  promoModif(id: number) {
    // Valeur récupérée dans le champ de modification de la page HTML
    const val = parseFloat((document.getElementById("promo" + id) as HTMLInputElement).value);

    if (val != null && (val >= 0 && val <= 100)) { this.modifPromo[id] = val; }
  }

  nouvelleTransaction(id: number, tigID: number, price: number) {
    if (this.modifStock[id]) {
      const type = (document.getElementById("operation" + tigID) as HTMLSelectElement).value;
      const quantity = this.modifStock[id]["val"].toString();
      this.transaction[id] = { "tigID": tigID, "type": type, "quantity": quantity, "price": price };
    }
  }

  testTransac() {
    console.log(this.transaction);
  }

  envoyerDonnees() {
    for (let id in this.modifStock) {
      const val = this.modifStock[id]["val"];
      const oldval = this.modifStock[id]["oldval"];
      if (val < 0 && -val <= oldval) {
        this.stockService.diminuerStock(parseInt(id), -val).subscribe();
        this.transacService.enregistrerTransaction(
          this.transaction[id]["tigID"],
          this.transaction[id]["type"],
          this.transaction[id]["price"],
          this.transaction[id]["quantity"]
        ).subscribe();
      }
      else if (val > 0) {
        this.stockService.augmenterStock(parseInt(id), val).subscribe();
        this.transacService.enregistrerTransaction(
          this.transaction[id]["tigID"],
          this.transaction[id]["type"],
          this.transaction[id]["price"],
          this.transaction[id]["quantity"]
        ).subscribe();
      }
    }

    for (let id in this.modifPromo) {
      const val = this.modifPromo[id];
      if (val == 0) { this.prodService.noPromo(parseInt(id)).subscribe(); }
      else { this.prodService.setPromotion(parseInt(id), val).subscribe(); }
    }

    alert("Données envoyées !");
    window.location.reload();
  }
}
