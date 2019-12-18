import { Component, OnInit } from "@angular/core";
import { ShoeService } from "../../services/shoe.service";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/categories.model";
import { Filter } from "../../models/filter.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  shoes = [];
  categories: Category[] = [];

  orders = [
    "Release Date Desc",
    "Release Date Asc",
    "Price Lowest",
    "Price Highest",
    "Popularity Lowest",
    "Popularity Highest"
  ];
  filter: Filter = new Filter();
  role: string;
  constructor(
    private shoeService: ShoeService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getShoes();
    this.getCategories();
    this.role = localStorage.getItem("role");
  }

  openCard;

  getShoes() {
    this.shoeService.getShoesFiltered({}).subscribe(res => {
      this.shoes = res;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }

  filterItems() {
    let filter = {};
    if (this.filter.idCategory) {
      filter["idCategory"] = this.filter.idCategory;
    }
    if (this.filter.dateFrom) {
      filter["dateFrom"] = new Date(this.filter.dateFrom).toISOString();
    }
    if (this.filter.dateTo) {
      filter["dateTo"] = new Date(this.filter.dateTo).toISOString();
    }
    if (this.filter.priceFrom) {
      filter["priceFrom"] = this.filter.priceFrom;
    }
    if (this.filter.priceTo) {
      filter["priceTo"] = this.filter.priceTo;
    }
    this.shoeService.getShoesFiltered(filter).subscribe(res => {
      switch (this.filter.order) {
        case this.orders[1]: {
          this.shoes = res.sort((a, b) => {
            if (a.releseDate < b.releseDate) {
              return -1;
            }
            if (a.releseDate > b.releseDate) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case this.orders[2]: {
          this.shoes = res.sort((a, b) => {
            if (a.price < b.price) {
              return -1;
            }
            if (a.price > b.price) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case this.orders[3]: {
          this.shoes = res.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            }
            if (a.price < b.price) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case this.orders[4]: {
          this.shoes = res.sort((a, b) => {
            if (a.popularity < b.popularity) {
              return -1;
            }
            if (a.popularity > b.popularity) {
              return 1;
            }
            return 0;
          });
          break;
        }
        case this.orders[5]: {
          this.shoes = res.sort((a, b) => {
            if (a.popularity > b.popularity) {
              return -1;
            }
            if (a.popularity < b.popularity) {
              return 1;
            }
            return 0;
          });
          break;
        }
        default:
          this.shoes = res;
      }
    });
  }
}
