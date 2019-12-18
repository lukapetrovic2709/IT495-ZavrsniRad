import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  oldPasswordInput: string;
  newPasswordInput: string;
  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.auth
      .changePassword(this.oldPasswordInput, this.newPasswordInput)
      .subscribe(
        res => {
          this.toastr.success("You successfully changed password");
          this.router.navigate(["/"]);
        },
        error => this.toastr.error(error.error)
      );
  }
}
