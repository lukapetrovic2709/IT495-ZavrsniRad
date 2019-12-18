import { Component, OnInit } from "@angular/core";
import { ShoeService } from "../../services/shoe.service";
import { Items } from "../../models/items.model";
import { PurchaseService } from "../../services/purchase.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.scss"]
})
export class ShoppingCartComponent implements OnInit {
  // @ts-ignore
  shoe: Shoe;
  shoeSize;

  items: Items[] = [];
  item = new Items();
  constructor(
    private shoeService: ShoeService,
    private purchaseService: PurchaseService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem("items"));
  }

  getSizeById(id) {
    this.shoeService.getSizeById(id).subscribe(res => {
      this.shoeSize = res;
    });
  }

  getShoeById(id) {
    this.shoeService.getShoeById(id).subscribe(res => {
      this.shoe = res;
    });
  }

  removeFromCart(item) {
    this.items = this.items.filter(it => it !== item);
  }

  makePuchase() {
    this.purchaseService.createPurchase(this.items).subscribe(res => {
      this.toastr.success("You successfully ordered shoes!");
      this.route.navigate(["home"]);
      localStorage.removeItem("items");
    });
  }
}
