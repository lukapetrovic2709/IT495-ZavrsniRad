import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/registration.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  getAllUsersUrl = environment.baseUrl + "/user/users";
  getUserByIdUrl = environment.baseUrl + "/user/";
  putUserUrl = environment.baseUrl + "/user/edit";
  putBunUserUrl = environment.baseUrl + "/user/ban/";
  putUnbunUserUrl = environment.baseUrl + "/user/unban/";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.getAllUsersUrl);
  }

  getUserById(id) {
    return this.http.get(this.getUserByIdUrl + `${id}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(this.putUserUrl, {
      id: user.id,
      emailVerified: user.emailVerified,
      active: user.active,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      postalCode: user.postalCode,
      country: user.country,
      phoneNumber: user.phoneNumber
    });
  }

  banUser(id: number): Observable<any> {
    return this.http.put(this.putBunUserUrl + `${id}`, {});
  }

  unbanUser(id: number) {
    return this.http.put(this.putUnbunUserUrl + `${id}`, {});
  }
}
