import { Component, OnInit } from "@angular/core";
import { PurchaseService } from "../../services/purchase.service";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-purchases",
  templateUrl: "./purchases.component.html",
  styleUrls: ["./purchases.component.scss"]
})
export class PurchasesComponent implements OnInit {
  purchases = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns = [
    "id",
    "date",
    "shoeId",
    "shoeName",
    "price",
    "quantity",
    "total",
    "user",
    "userAddress",
    "userCity",
    "userCountry"
  ];

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getAllPurchases();
  }

  getAllPurchases() {
    this.purchaseService.getAllPurchases().subscribe(res => {
      this.purchases = res;
      this.dataSource = new MatTableDataSource(this.purchases);
    });
  }
}
