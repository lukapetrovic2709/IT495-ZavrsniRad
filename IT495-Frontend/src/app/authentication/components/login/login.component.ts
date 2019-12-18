import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";
import { RolesEnum } from "../../../core/enums/roles.enum";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  emailInput: string;
  passwordInput: string;
  role;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  @ViewChild("loginForm", { static: false })
  loginForm: NgForm;

  ngOnInit() {}

  onSubmit() {
    localStorage.clear();
    if (!this.emailInput || !this.passwordInput) {
    } else {
      this.auth.loginUser(this.emailInput, this.passwordInput).subscribe(
        res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
          localStorage.setItem("id", res.id);
          localStorage.setItem("role", res.authorities[0].authority);

          this.role = this.auth.getUserRole();
          if (this.role === RolesEnum.USER) {
            this.toastr.success("You just successfully login");
            this.router.navigate(["home"]);
          } else {
            this.router.navigate(["users"]);
          }
        },
        err => this.toastr.error(err.error)
      );
    }
  }
}
