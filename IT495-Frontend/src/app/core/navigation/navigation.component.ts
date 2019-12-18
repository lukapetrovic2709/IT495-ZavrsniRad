import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { RolesEnum } from "../enums/roles.enum";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  roles: string;
  ADMIN = RolesEnum.ADMIN;
  USER = RolesEnum.USER;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.roles = this.auth.getUserRole();
  }

  logout() {
    this.auth.logout();
  }
}
