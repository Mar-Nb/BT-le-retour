import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabAnnee = [
    "Janvier", "Février", "Mars",
    "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre",
    "Octobre", "Novembre", "Décembre"
  ];
  tabTrimestre = [];
  tabMois = [];
  typeCalculCA = ["annee", "trimestre", "mois", "semaine", "jour"];

  selectAnnee: number = (new Date()).getFullYear();
  selectMois: number = 1;
  selectTrimestre: number = 1;
  selectJour: number;

  current = { annee: true, trimestre: false, mois: false, semaine: false, jour: false };

  dataAnnee = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: " " }
  ];
  dataTrimestre = [
    { data: [0, 0, 0], label: " " }
  ];
  dataMois = [{
    data: [], label: " "
  }];

  ca = { annee: 0, trimestre: 0, mois: 0, semaine: 0, jour: 0 };

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  barChartType = "bar";
  barChartLegend = true;

  constructor(public transacService: TransactionService) { }

  ngOnInit(): void {
    const aujourdhui = new Date();
    this.getBoardAnnee(aujourdhui.getFullYear());
    this.getBoardTrimestre(aujourdhui.getFullYear(), this.selectTrimestre);
    this.getBoardMois(aujourdhui.getFullYear(), this.selectMois);
  }

  toggleCurrent(event: any, typeCurrent: string) {
    this.current[typeCurrent] = true;
    document.getElementById("tab-" + typeCurrent).classList.add("is-active");
    document.getElementById(typeCurrent).classList.remove("hidden");

    for (let calcul of this.typeCalculCA) {
      if (calcul != typeCurrent) {
        this.current[calcul] = false;
        document.getElementById("tab-" + calcul).classList.remove("is-active");
        document.getElementById(calcul).classList.add("hidden");
      }
    }
  }

  repartitionTransactionAnnee(t: any) {
    for (let transac of t) {
      const dateTransac = new Date(transac.date);
      const valeur = transac.price * transac.quantity;

      switch (dateTransac.getMonth()) {
        case 0: this.dataAnnee[0].data[0] += valeur; break;
        case 1: this.dataAnnee[0].data[1] += valeur; break;
        case 2: this.dataAnnee[0].data[2] += valeur; break;
        case 3: this.dataAnnee[0].data[3] += valeur; break;
        case 4: this.dataAnnee[0].data[4] += valeur; break;
        case 5: this.dataAnnee[0].data[5] += valeur; break;
        case 6: this.dataAnnee[0].data[6] += valeur; break;
        case 7: this.dataAnnee[0].data[7] += valeur; break;
        case 8: this.dataAnnee[0].data[8] += valeur; break;
        case 9: this.dataAnnee[0].data[9] += valeur; break;
        case 10: this.dataAnnee[0].data[10] += valeur; break;
        case 11: this.dataAnnee[0].data[11] += valeur; break;
      }
    }
  }

  repartitionTransactionTrimestre(t: any, trim: number) {
    for (let transac of t) {
      const dateTransac = new Date(transac.date);
      const valeur = transac.price * transac.quantity;

      // NOTE: Pour une raison étrange, trim est devenu une string pendant le processus d'appel
      switch (parseInt(trim.toString())) {
        case 1:
          switch (dateTransac.getMonth()) {
            case 0: this.dataTrimestre[0].data[0] += valeur; break;
            case 1: this.dataTrimestre[0].data[1] += valeur; break;
            case 2: this.dataTrimestre[0].data[2] += valeur; break;
          }
          this.tabTrimestre = ["Janvier", "Février", "Mars"]; break;

        case 2:
          switch (dateTransac.getMonth()) {
            case 3: this.dataTrimestre[0].data[0] += valeur; break;
            case 4: this.dataTrimestre[0].data[1] += valeur; break;
            case 5: this.dataTrimestre[0].data[2] += valeur; break;
          }
          this.tabTrimestre = ["Avril", "Mai", "Juin"]; break;

        case 3:
          switch (dateTransac.getMonth()) {
            case 6: this.dataTrimestre[0].data[0] += valeur; break;
            case 7: this.dataTrimestre[0].data[1] += valeur; break;
            case 8: this.dataTrimestre[0].data[2] += valeur; break;
          }
          this.tabTrimestre = ["Juillet", "Août", "Septembre"]; break;

        case 4:
          switch (dateTransac.getMonth()) {
            case 9: this.dataTrimestre[0].data[0] += valeur; break;
            case 10: this.dataTrimestre[0].data[1] += valeur; break;
            case 11: this.dataTrimestre[0].data[2] += valeur; break;
          }
          this.tabTrimestre = ["Octobre", "Novembre", "Décembre"]; break;

        default: console.log("starf");
      }
    }
  }

  repartitionTransactionMois(t: any) {
    let mois = [];

    for (let transac of t) {
      const dateTransac = new Date(transac.date);
      const valeur = transac.price * transac.quantity;
      const cle = dateTransac.getDate() + " " + this.tabAnnee[this.selectMois - 1];

      if (mois[cle]) { mois[cle] += valeur; }
      else { mois[cle] = valeur; }
    }

    for (let key in mois) {
      this.dataMois[0].data.push(mois[key]);
      this.tabMois.push(key);
    }

    this.dataMois[0].label = this.tabAnnee[this.selectMois - 1];
  }

  afficheSelection() {
    if (this.current.annee && this.selectAnnee > 0) { this.getBoardAnnee(this.selectAnnee); }
    else if (this.current.trimestre && this.selectAnnee > 0) {
      this.getBoardTrimestre(this.selectAnnee, this.selectTrimestre);
    } else if (this.current.mois && this.selectAnnee > 0) {
      this.getBoardMois(this.selectAnnee, this.selectMois);
    }

    this.updateGraph()
  }

  getBoardAnnee(annee: number) {
    let transactions: any = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    this.transacService.getTransactionAnnee(annee).subscribe(
      (res) => {
        // Si des transactions existe pour l'année sélectionnée
        if (res[0]) {
          this.dataAnnee[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.dataAnnee[0].label = "Année " + annee;
          transactions = res;

          this.repartitionTransactionAnnee(transactions);
          this.ca.annee = this.dataAnnee[0].data.reduce(reducer);
        } else { alert("Pas de data pour cette année."); }
      },
      (err) => { alert("Erreur API: " + err.message); }
    );
  }

  getBoardTrimestre(annee: number, trimestre: number) {
    let transactions: any = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    this.transacService.getTransactionTrimestre(annee, trimestre).subscribe(
      (res) => {
        if (res[0]) {
          this.dataTrimestre[0].data = [0, 0, 0];
          this.dataTrimestre[0].label = "Trimestre " + trimestre;
          this.tabTrimestre = [];
          transactions = res;

          this.repartitionTransactionTrimestre(transactions, trimestre);
          this.ca.trimestre = this.dataTrimestre[0].data.reduce(reducer);
        } else { alert("Pas de data pour ce trimestre."); }
      },
      (err) => { alert("Erreur API: " + err.message); }
    );
  }

  getBoardMois(annee: number, mois: number) {
    let transactions: any = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    this.transacService.getTransactionMois(annee, mois).subscribe(
      (res) => {
        if (res[0]) {
          this.dataMois[0].data = [];
          this.dataMois[0].label = " ";
          this.tabMois = [];
          transactions = res;

          this.repartitionTransactionMois(transactions);
          this.ca.mois = this.dataMois[0].data.reduce(reducer);
        } else { alert("Pas de data pour ce mois."); }
      },
      (err) => { alert("Erreur API: " + err.message); }
    );
  }

  updateGraph() {
    // NOTE: Ligne nécessaire pour mettre à jour les valeurs du graphique,
    // qui sont null à l'initialisation du composant

    this.dataAnnee = this.dataAnnee.slice();
    this.dataTrimestre = this.dataTrimestre.slice();
  }
}
