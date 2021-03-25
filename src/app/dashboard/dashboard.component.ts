import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tabMois = [
    "Janvier", "Février", "Mars",
    "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre",
    "Octobre", "Novembre", "Décembre"
  ];
  typeCalculCA = ["annee", "trimestre", "mois", "semaine", "jour"];

  selectAnnee: number;
  selectMois: number = 1;
  selectJour: number;

  current = { annee: true, trimestre: false, mois: false, semaine: false, jour: false };

  transactionParMois = {
    janvier: [], fevrier: [], mars: [],
    avril: [], mai: [], juin: [],
    juillet: [], aout: [], septembre: [],
    octobre: [], novembre: [], decembre: []
  };
  dataAnnee = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: " " }
  ];

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

  repartitionTransactionMois(t: any) {
    for (let transac of t) {
      const dateTransac = new Date(transac.date);
      const valeur = transac.price * transac.quantity;
      switch(dateTransac.getMonth()) {
        case 0:
          this.transactionParMois.janvier.push(valeur);
          this.dataAnnee[0].data[0] += valeur;
          break;
        case 1:
          this.transactionParMois.fevrier.push(valeur);
          this.dataAnnee[0].data[1] += valeur;
          break;
        case 2:
          this.transactionParMois.mars.push(valeur);
          this.dataAnnee[0].data[2] += valeur;
          break;
        case 3:
          this.transactionParMois.avril.push(valeur);
          this.dataAnnee[0].data[3] += valeur;
          break;
        case 4:
          this.transactionParMois.mai.push(valeur);
          this.dataAnnee[0].data[4] += valeur;
          break;
        case 5:
          this.transactionParMois.juin.push(valeur);
          this.dataAnnee[0].data[5] += valeur;
          break;
        case 6:
          this.transactionParMois.juillet.push(valeur);
          this.dataAnnee[0].data[6] += valeur;
          break;
        case 7:
          this.transactionParMois.aout.push(valeur);
          this.dataAnnee[0].data[7] += valeur;
          break;
        case 8:
          this.transactionParMois.septembre.push(valeur);
          this.dataAnnee[0].data[8] += valeur;
          break;
        case 9:
          this.transactionParMois.octobre.push(valeur);
          this.dataAnnee[0].data[9] += valeur;
          break;
        case 10:
          this.transactionParMois.novembre.push(valeur);
          this.dataAnnee[0].data[10] += valeur;
          break;
        case 11:
          this.transactionParMois.decembre.push(valeur);
          this.dataAnnee[0].data[11] += valeur;
          break;
      }
    }

    // NOTE: Ligne nécessaire pour mettre à jour les valeurs du graphique
    this.dataAnnee = this.dataAnnee.slice();
  }

  afficheSelection() {
    if (this.current.annee) { this.getBoardAnnee(this.selectAnnee); }
  }

  getBoardAnnee(annee: number) {
    let transactions: any = [];

    this.transacService.getTransactionAnnee(annee).subscribe(
      (res) => {
        if (res[0]) {
          this.dataAnnee[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          this.dataAnnee[0].label = "Année " + annee.toString();
          transactions = res;

          this.repartitionTransactionMois(transactions);
        } else { alert("Pas de data pour cette année."); }
      },
      (err) => { alert("Erreur API: " + err.message); }
    );
  }
}
