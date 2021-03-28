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

  modifStock: any;
  modifPromo: any;

  constructor(public prodService: ProductsService, public stockService: StockService) {
    this.produits = [];
    this.crustaces = [];
    this.fruitsDeMer = [];
    this.poissons = [];
    this.modifStock = [];
    this.modifPromo = [];
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

