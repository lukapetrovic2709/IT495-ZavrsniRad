import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./core/components/errors/page-not-found/page-not-found.component";
import { UserManagmentComponent } from "./user-managment/components/user-managment/user-managment.component";
import { AdminGuard } from "./core/guards/admin.guard";
import { DashboardComponent } from "./dashboard/components/dashboard/dashboard.component";
import { CategoryComponent } from "./dashboard/components/category/category.component";
import { CreateShoeComponent } from "./dashboard/components/create-shoe/create-shoe.component";
import { SingleShoeComponent } from "./dashboard/components/single-shoe/single-shoe.component";
import { PurchasesComponent } from "./dashboard/components/purchases/purchases.component";
import { ShoppingCartComponent } from "./dashboard/components/shopping-cart/shopping-cart.component";
import { MyPurchasesComponent } from "./dashboard/components/my-purchases/my-purchases.component";
import { UserProfileComponent } from "./user-managment/components/user-profile/user-profile/user-profile.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./authentication/authentication.module#AuthenticationModule"
  },
  {
    path: "home",
    component: DashboardComponent
  },
  {
    path: "home/:id",
    component: SingleShoeComponent
  },
  {
    path: "category",
    component: CategoryComponent
  },
  {
    path: "create-shoe",
    component: CreateShoeComponent
  },
  {
    path: "purchases",
    component: PurchasesComponent
  },
  {
    path: "my-purchases",
    component: MyPurchasesComponent
  },
  {
    path: "shopping-cart",
    component: ShoppingCartComponent
  },

  {
    path: "users",
    component: UserManagmentComponent,
    canActivate: [AdminGuard]
  },
  { path: "edit-user", component: UserProfileComponent },
  { path: "page-not-found", component: PageNotFoundComponent },
  { path: "**", redirectTo: "page-not-found", pathMatch: "full" }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  DashboardComponent,
  SingleShoeComponent,
  CategoryComponent,
  CreateShoeComponent,
  PurchasesComponent,
  MyPurchasesComponent,
  ShoppingCartComponent,
  UserManagmentComponent,
  UserProfileComponent,
  PageNotFoundComponent
];
