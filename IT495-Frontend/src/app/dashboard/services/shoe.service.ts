import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Shoe } from "../models/shoe.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Size } from "../models/size.model";

@Injectable({
  providedIn: "root"
})
export class ShoeService {
  allShoesUrl = environment.baseUrl + "/shoe/all";
  createShoeUrl = environment.baseUrl + "/shoe";
  getShoeByIdUrl = environment.baseUrl + "/shoe/";
  deleteShoeUrl = environment.baseUrl + "/shoe/delete/";
  uploadPhotoUrl = environment.baseUrl + "/shoe/upload-photo/";
  allSizesUrl = environment.baseUrl + "/size/all";
  getSizeByIdUrl = environment.baseUrl + "/size/";
  filteredShoesUrl = environment.baseUrl + "/shoe/filter";

  constructor(private http: HttpClient) {}

  getAllShoes(): Observable<any> {
    return this.http.get<any>(this.allShoesUrl);
  }

  getShoesFiltered(filter: any): Observable<any> {
    return this.http.get<any>(this.filteredShoesUrl, {
      params: filter
    });
  }

  getAllSizes(): Observable<any> {
    return this.http.get<any>(this.allSizesUrl);
  }

  getSizeById(id: number): Observable<any> {
    return this.http.get<any>(this.getSizeByIdUrl + `${id}`, {});
  }

  getShoeById(id: number): Observable<Shoe> {
    return this.http.get<Shoe>(this.getShoeByIdUrl + `${id}`, {});
  }
  createShoe(shoe: Shoe): Observable<Shoe> {
    return this.http.post<Shoe>(this.createShoeUrl, {
      categoryId: shoe.categoryId,
      gender: shoe.gender,
      name: shoe.name,
      price: shoe.price,
      sizes: shoe.sizes
    });
  }

  editShoe(id: number, shoe: Shoe) {
    return this.http.put(this.getShoeByIdUrl + `${id}`, {
      categoryId: shoe.categoryId,
      categoryName: shoe.categoryName,
      gender: shoe.gender,
      name: shoe.name,
      price: shoe.price,
      sizes: shoe.sizes
    });
  }

  deleteShoe(id: number) {
    return this.http.put(this.deleteShoeUrl + `${id}`, {});
  }

  uploadPhoto(id: number, formData): Observable<any> {
    return this.http.post(this.uploadPhotoUrl + `${id}`, formData);
  }

  newShoe() {
    return new Shoe({});
  }

  newSize() {
    return new Size({});
  }
}
