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
    const val = parseFloat((document.getElementById("stock" + id) as HTMLInputElement).value);

    if (val != null && val != 0) { this.modifStock[id] = {"val": val, "oldval": oldval};}
  }

  promoModif(id: number) {
    // Valeur récupérée dans le champ de modification de la page HTML
    const val = parseFloat((document.getElementById("promo" + id) as HTMLInputElement).value);

    if (val != null) { this.modifPromo[id] = val; }
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
    var check= 0;
    for (let id in this.modifStock) {
      const val = this.modifStock[id]["val"];
      const oldval = this.modifStock[id]["oldval"];
      if ( oldval+val < 0 || val > 100 || this.isNotInt(val)){
        const error = document.getElementById('errorStock'+id);
        error.textContent = "Rentrez un nombre entier entre -" + oldval + "et 100";
        error.style.color = "red";
        check= -1;
      }
      else if (val < 0 && -val <= oldval){ 
        this.stockService.diminuerStock(parseInt(id), -val).subscribe();
        const error = document.getElementById('errorStock'+id);
        error.textContent = "";
      }
      else if (val > 0 && val < 100) { 
        this.stockService.augmenterStock(parseInt(id), val).subscribe();
        const error = document.getElementById('errorStock'+id);
        error.textContent = "";
      }  
    }

    for (let id in this.modifPromo) {
      const val = this.modifPromo[id];
      if (val == 0) { 
        this.prodService.noPromo(parseInt(id)).subscribe();
        const error = document.getElementById('errorPromo'+id);
        error.textContent = ""; 
      }
      else if(val <100 && val > 0) { 
        this.prodService.setPromotion(parseInt(id), val).subscribe();
        const error = document.getElementById('errorPromo'+id);
        error.textContent = "";
      }
      else{
        const error = document.getElementById('errorPromo'+id);
        error.textContent = "Rentrez un nombre entre 0 et 99.99";
        error.style.color = "red";
        check= -1;
      }
      

    }
    if(check==0){
      alert("Données envoyées !");
      window.location.reload();
    }
  }

  isNotInt(num: number){
    if((num%1) !=0){ return true; }
    return false;
  }
}

