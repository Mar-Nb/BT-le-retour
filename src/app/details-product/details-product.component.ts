import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  produits: any;
  produit: any;
  correspondanceListe: any = [] ;
  unite: number;

  constructor(public produitsService: ProductsService, public stockService: StockService) { this.produits = []; }

  ngOnInit(): void {
    this.produitsService.getData().subscribe(
      (res) => {
        this.produits = res;
      },
      (err) => { alert("Failed loading JSON data : " + err.message); });
  }

  getChoix(id: number) {
    for (let p of this.produits) { if (p.id == id) { this.produit = p; break; } }
  }

  getCorrespondance(event: any) {
    this.correspondanceListe = [];
    const texte : string = event.target.value;

    if (texte.length > 2) {
      this.produits.forEach(element => {
        const verif : string = element.name;
        if (verif.toLowerCase().match(texte.toLowerCase())) { this.correspondanceListe.push(element); }
      });
    }

    console.log(this.correspondanceListe);
  }

  plus(id: number, unite: number) {
    this.stockService.augmenterStock(id, unite).subscribe(
      (prod) => { this.produit = prod; },
      (err) => { alert("Problème API : " + err.message); }
    );
  }
  
  moins(id: number, unite: number) {
    this.stockService.diminuerStock(id, unite).subscribe(
      (prod) => { this.produit = prod },
      (err) => { alert("Problème API : " + err.message); }
    );
  }
}
