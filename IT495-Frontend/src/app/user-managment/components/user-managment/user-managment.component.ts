import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { UsersService } from "../../services/users.service";
import { MatTableDataSource } from "@angular/material";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PurchaseService } from "src/app/dashboard/services/purchase.service";

@Component({
  selector: "app-user-managment",
  templateUrl: "./user-managment.component.html",
  styleUrls: ["./user-managment.component.scss"]
})
export class UserManagmentComponent implements OnInit {
  role: string;
  users = [];
  editMode: Boolean = false;
  purchaseMode: boolean = false;
  user: any = this.auth.newUser();
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSourcePurchase: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild("editUserForm", { static: false })
  editUserForm: NgForm;
  userPurchases = [];

  constructor(
    private userService: UsersService,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private purchaseService: PurchaseService
  ) {}

  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "emailVerified",
    "phone",
    "address",
    "city",
    "country",
    "active",
    "edit",
    "bun",
    "purchases"
  ];

  displayedColumnsPurchase = [
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
  ngOnInit() {
    this.getUsers();
  }

  editUser(user, id) {
    this.editMode = true;
    this.purchaseMode = false;
    this.userService.getUserById(user.id).subscribe(res => (this.user = res));
  }

  seePurchases(user, id) {
    this.purchaseMode = true;
    this.editMode = false;
    this.purchaseService.getUserPurchases(user.id).subscribe(res => {
      this.userPurchases = res;
      this.dataSourcePurchase = new MatTableDataSource(this.userPurchases);
    });
  }

  submitEditUserForm() {
    this.userService.editUser(this.user).subscribe(res => {
      this.toastr.success("Successfully edited user");
      this.getUsers();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }

  banUser(user, id) {
    this.userService.banUser(user.id).subscribe(
      res => console.log(res),
      error => {
        if (error.error.text === "Success") {
          this.toastr.success("User is successfully banned");
          this.getUsers();
        } else {
          this.toastr.error("Something went wrong");
        }
      }
    );
  }

  unbanUser(user, id) {
    this.userService.unbanUser(user.id).subscribe(
      res => console.log(res),
      error => {
        if (error.error.text === "Success") {
          this.toastr.success("User is successfully unbanned");
          this.getUsers();
        } else {
          this.toastr.error("Something went wrong");
        }
      }
    );
  }
}
