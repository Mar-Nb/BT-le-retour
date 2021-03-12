import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  urlApi: any;

  constructor(public http: HttpClient) { this.urlApi = "http://localhost:8000" }

  augmenterStock(id: number, unite: number) {
    return this.http.get(this.urlApi + "/incrementstock/" + id + "/" + unite + "/");
  }

  diminuerStock(id: number, unite: number) {
    return this.http.get(this.urlApi + "/decrementstock/" + id + "/" + unite + "/");
  }
}
