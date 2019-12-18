import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/registration.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  user: User = this.authService.newUser();

  @ViewChild("registrationForm", { static: false }) registerForm: NgForm;
  constructor(
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.registerUser(this.user).subscribe(
      res => {
        this.toastr.success("Go to your email address to confirm");
      },
      error => this.toastr.error(error.error)
    );
  }
}
