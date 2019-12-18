import { Component, OnInit } from "@angular/core";
import { ShoeService } from "../../services/shoe.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Shoe } from "../../models/shoe.model";
import { PurchaseService } from "../../services/purchase.service";
import { Items } from "../../models/items.model";

@Component({
  selector: "app-single-shoe",
  templateUrl: "./single-shoe.component.html",
  styleUrls: ["./single-shoe.component.scss"]
})
export class SingleShoeComponent implements OnInit {
  // @ts-ignore
  shoe: Shoe = {};
  sizes = [];
  // @ts-ignore
  item: Items = {};
  checked;
  quantity;
  constructor(
    private shoeService: ShoeService,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getShoeById(params["id"]);
    });
  }
  getShoeById(id) {
    this.shoeService.getShoeById(id).subscribe(res => {
      this.shoe = res;
      this.sizes = this.shoe.sizes;
      this.item.shoeId = +id;
      this.item.shoe = res;
    });
  }

  orderShoe() {
    let items = JSON.parse(localStorage.getItem("items"));
    if (!items) {
      items = [];
    }

    const filtered = items.filter(
      item => item.shoeId === this.item.shoeId && item.size === this.item.size
    );
    if (filtered.length > 0) {
      items.map(item => {
        if (item.shoeId === this.item.shoeId && item.size === this.item.size) {
          item.quantity += this.item.quantity;
        }
      });
    } else {
      items.push(this.item);
    }

    localStorage.setItem("items", JSON.stringify(items));
    this.router.navigate(["home"]);
  }
}
