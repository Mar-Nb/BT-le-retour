import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../services/products.service";

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  selection: number;
  produits: any;
  produit: any;
  correspondanceListe: any = [] ;

  lastkeydown: number = 0;

  constructor(public produitsService: ProductsService) { this.produits = []; }

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

    // const limite = event.timeStamp - this.lastkeydown;

    if (texte.length > 2) {
      this.produits.forEach(element => {
        const verif : string = element.name;
        if (verif.toLowerCase().match(texte.toLowerCase())) { this.correspondanceListe.push(element); }
      });
    }

    this.lastkeydown = event.timeStamp;
    console.log(this.correspondanceListe);
  }
}
