import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/user-managment/services/users.service";
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  editClicked = false;
  createClicked = false;
  editableMode = true;
  user: any = this.auth.newUser();
  logedInUserId: number;
  constructor(
    private userService: UsersService,
    private auth: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.logedInUserId = +localStorage.getItem("id");
    this.getUser();
  }
  onEdit() {
    this.editClicked = true;
    this.editableMode = false;
  }

  getUser() {
    this.userService
      .getUserById(this.logedInUserId)
      .subscribe(res => (this.user = res));
  }
  submitEditProfile() {
    this.editClicked = false;
    this.editableMode = false;
    this.createClicked = true;
    this.userService.editUser(this.user).subscribe(res => {
      this.toastr.success("Successfully edited user");
    });
  }
}
