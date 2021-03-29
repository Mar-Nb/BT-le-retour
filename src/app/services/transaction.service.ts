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

  getTransactionAnnee(annee: number) {
    return this.http.get(this.urlApi + "/transaction/getannee/" + annee + "/");
  }

  getTransactionTrimestre(annee: number, trimestre: number) {
    return this.http.get(this.urlApi + "/transaction/gettrimestre/" + annee + "/" + trimestre + "/");
  }

  getTransactionMois(annee: number, mois: number) {
    return this.http.get(this.urlApi + "/transaction/getmois/" + annee + "/" + mois + "/");
  }

  getTransactionJour(annee: number, mois: number, jour: number) {
    return this.http.get(this.urlApi + "/transaction/getjour/" + annee + "/" + mois + "/" + jour + "/");
  }
}
