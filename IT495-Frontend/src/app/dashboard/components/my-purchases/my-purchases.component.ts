import { Component, OnInit } from "@angular/core";
import { PurchaseService } from "../../services/purchase.service";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-my-purchases",
  templateUrl: "./my-purchases.component.html",
  styleUrls: ["./my-purchases.component.scss"]
})
export class MyPurchasesComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  purchases = [];

  displayedColumns = ["date", "shoeName", "price", "size", "quantity", "total"];
  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getMyPurchases();
  }

  getMyPurchases() {
    this.purchaseService.getMyPurchases().subscribe(res => {
      this.purchases = res;
      this.dataSource = new MatTableDataSource(this.purchases);
    });
  }
}
