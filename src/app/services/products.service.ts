import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  urlApi: any;

  constructor(public http: HttpClient) { this.urlApi = "../assets/data/products.json" }

  getData() { return this.http.get(this.urlApi); }

}
