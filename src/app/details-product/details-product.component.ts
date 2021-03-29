import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";
import { StockService } from '../services/stock.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  produits: any;
  produit: any;
  correspondanceListe: any = [];
  unite: number;
  operation: string = "ajout";

  pourcentPromo: number;

  constructor(public produitsService: ProductsService,
    public stockService: StockService,
    public transacService: TransactionService) { this.produits = []; }

  ngOnInit(): void {
    this.produitsService.getData().subscribe(
      (res) => {
        this.produits = res;

        for (let p of this.produits) {
          if (p.sale && p.discount > 0) {
            p.price_on_sale = p.price * (1 - p.discount / 100);

            // Number.toFixed() permet de garder 2 décimales, mais renvoie un string
            p.price_on_sale = p.price_on_sale.toFixed(2);
          }
        }
      },
      (err) => { alert("Failed loading JSON data : " + err.message); });
  }

  getChoix(id: number) {
    for (let p of this.produits) { if (p.id == id) { this.produit = p; break; } }
  }

  getCorrespondance(event: any) {
    this.correspondanceListe = [];
    const texte: string = event.target.value;

    if (texte.length > 2) {
      this.produits.forEach(element => {
        const verif: string = element.name;
        if (verif.toLowerCase().match(texte.toLowerCase())) { this.correspondanceListe.push(element); }
      });
    }

    console.log(this.correspondanceListe);
  }

  plus(id: number, unite: number) {
    if (unite != null) {
      this.stockService.augmenterStock(id, unite).subscribe(
        (prod) => {
          this.produit = prod;
          this.transacService.enregistrerTransaction(this.produit.tigID,
            this.operation,
            this.produit.price,
            unite.toString()).subscribe();
        },
        (err) => { alert("Problème API : " + err.message); }
      );
    } else {
      // "unite" est un number, donc du texte dans l'input renvoie null
      alert("Le stock doit être un nombre.");
    }
  }

  moins(id: number, unite: number) {
    if (unite != null) {
      this.stockService.diminuerStock(id, unite).subscribe(
        (prod) => {
          this.produit = prod;
          this.transacService.enregistrerTransaction(this.produit.tigID,
            this.operation,
            this.produit.price,
            unite.toString()).subscribe();
        },
        (err) => { alert("Problème API : " + err.message); }
      );
    } else {
      // "unite" est un number, donc du texte dans l'input renvoie null
      alert("Le stock doit être un nombre.");
    }
  }

  promo(id: number, newpromo: number) {
    if (newpromo == null) {
      // "newpromo" est un number, donc du texte dans l'input renvoie null
      alert("La promotion doit être un nombre.");
    } else if (newpromo >= 0 && newpromo <= 100) {
      this.produitsService.setPromotion(id, newpromo).subscribe(
        (prod) => { this.produit = prod },
        (err) => { alert("Problème API : " + err.message); }
      );
    } else if (newpromo < 0 || newpromo > 100) { alert("La promotion doit être comprise entre 0 et 100."); }
  }
}
