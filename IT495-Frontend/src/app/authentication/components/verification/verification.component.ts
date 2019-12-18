import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.component.html",
  styleUrls: ["./verification.component.scss"]
})
export class VerificationComponent implements OnInit {
  token: String;
  error;
  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.error = false;
  }

  verifyUser() {
    this.route.params.subscribe(params => {
      this.token = params.id;
      this.auth.verifyUser(this.token).subscribe(
        res => console.log(res),
        error => {
          if (error.error.text === "Success") {
            this.router.navigate(["/"]);
          } else {
            this.toastr.error("Something went wrong");
            this.error = error;
          }
        }
      );
    });
  }
}
