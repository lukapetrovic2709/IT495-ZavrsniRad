import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Items } from "../models/items.model";

@Injectable({
  providedIn: "root"
})
export class PurchaseService {
  createPurchasesUrl = environment.baseUrl + "/purchase";
  getAllPurchasesUrl = environment.baseUrl + "/purchase/all";
  getUserPurchasesUrl = environment.baseUrl + "/purchase/all/";
  getMyPurchasesURL = environment.baseUrl + "/purchase/my";
  getPurchaseByIdUrl = environment.baseUrl + "/purchase/";

  constructor(private http: HttpClient) {}

  getAllPurchases(): Observable<any> {
    return this.http.get(this.getAllPurchasesUrl);
  }
  getUserPurchases(userId: number): Observable<any> {
    return this.http.get(this.getUserPurchasesUrl + `${userId}`);
  }
  getMyPurchases(): Observable<any> {
    return this.http.get(this.getMyPurchasesURL);
  }

  getPurchaseById(id: number): Observable<any> {
    return this.http.get(this.getPurchaseByIdUrl + `${id}`);
  }

  createPurchase(items: Items[]): Observable<Items[]> {
    return this.http.post<Items[]>(this.createPurchasesUrl, {
      items: items.map(item => {
        return {
          quantity: item.quantity,
          shoeId: item.shoeId,
          size: item.size.value
        };
      })
    });
  }
}
