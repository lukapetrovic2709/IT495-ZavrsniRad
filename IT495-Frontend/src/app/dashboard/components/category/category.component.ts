import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/categories.model";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  category: Category = this.categoryService.newCategory();
  categories = [];
  displayedColumns: string[] = ["id", "name"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
      this.dataSource = new MatTableDataSource(this.categories);
    });
  }
  submitNewCategory() {
    this.categoryService.createCategory(this.category.name).subscribe(
      res => {
        this.toastr.success("Successfully created category");
        this.getCategories();
      },
      error => this.toastr.error(error.error)
    );
  }
}
