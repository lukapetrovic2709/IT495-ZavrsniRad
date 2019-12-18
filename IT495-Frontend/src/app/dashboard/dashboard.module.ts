import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoryComponent } from "./components/category/category.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CreateShoeComponent } from "./components/create-shoe/create-shoe.component";
import { SingleShoeComponent } from "./components/single-shoe/single-shoe.component";
import { PurchasesComponent } from "./components/purchases/purchases.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { MyPurchasesComponent } from './components/my-purchases/my-purchases.component';
@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    CreateShoeComponent,
    SingleShoeComponent,
    PurchasesComponent,
    ShoppingCartComponent,
    MyPurchasesComponent
  ],
  imports: [CommonModule]
})
export class DashboardModule {}
