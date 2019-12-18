import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../models/categories.model";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  getCategoriesUrl = environment.baseUrl + "/category/categories";
  postCategoryUrl = environment.baseUrl + "/category";

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.getCategoriesUrl, {});
  }

  createCategory(name: string): Observable<any> {
    return this.http.post(this.postCategoryUrl, {
      name: name
    });
  }

  newCategory() {
    return new Category();
  }
}
