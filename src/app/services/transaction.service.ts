import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  urlApi: any;

  constructor(public http:HttpClient) { this.urlApi = "http://localhost:8000"; }

  enregistrerTransaction(tigID: number, type: string, price: number, quantity: string) {
    return this.http.get(
      this.urlApi + "/transaction/" + tigID + "/" + type + "/" + price + "/" + quantity + "/");
  }
}
