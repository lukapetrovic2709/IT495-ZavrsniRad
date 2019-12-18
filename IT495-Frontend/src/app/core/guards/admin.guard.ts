import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { RolesEnum } from "../enums/roles.enum";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(): Observable<any> {
    let role = this.auth.getUserRole();
    if (role === RolesEnum.USER) {
      this.router.navigate([""]);
      return of(false);
    }

    return of(true);
  }
}
