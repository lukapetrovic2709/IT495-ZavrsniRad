import { Component, OnInit } from "@angular/core";
import { Shoe } from "../../models/shoe.model";
import { ShoeService } from "../../services/shoe.service";
import { CategoryService } from "../../services/category.service";
import { ToastrService } from "ngx-toastr";
import { Size } from "../../models/size.model";
import { MatTableDataSource } from "@angular/material";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-create-shoe",
  templateUrl: "./create-shoe.component.html",
  styleUrls: ["./create-shoe.component.scss"]
})
export class CreateShoeComponent implements OnInit {
  shoe: Shoe = this.shoeService.newShoe();
  categories = [];
  shoes: Shoe[] = [];
  sizes: Size[] = [];
  showUploadForm = false;
  uploadImageShoeId: number;
  fileValid = false;
  uploadForm: FormGroup;
  uploadedPicture: File;
  url = "";

  displayedColumns = [
    "id",
    "name",
    "gender",
    "price",
    "sizes",
    "delete",
    "uploadImage"
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private shoeService: ShoeService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getShoes();
    this.getSizes();
  }

  onFileSelect(event) {
    const files = event.target.files;
    this.uploadedPicture = files.item(0);
    if (this.validateFile()) {
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedPicture);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    } else {
      this.url = "";
    }
  }

  uploadImage() {
    const formData = new FormData();
    formData.append("file", this.uploadedPicture);
    this.shoeService.uploadPhoto(this.uploadImageShoeId, formData).subscribe(
      res => {
        this.toastr.success("Successfully uploaded image!");
      },
      err => {
        this.toastr.error(err.error);
      }
    );
  }

  uploadPhotoClick(shoe, id) {
    this.uploadImageShoeId = shoe.id;
    this.showUploadForm = true;
  }

  validateFile() {
    if (!this.uploadedPicture) {
      this.fileValid = false;
      return false;
    } else if (
      this.uploadedPicture.type !== "image/jpeg" &&
      this.uploadedPicture.type !== "image/jpg" &&
      this.uploadedPicture.type !== "image/png"
    ) {
      this.toastr.error("Wrong format");
      this.fileValid = false;
      return false;
    } else if (this.uploadedPicture.size >= 5242880) {
      this.toastr.error("Size too big");
      this.fileValid = false;
      return false;
    } else {
      this.fileValid = true;
      return true;
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }
  submitNewShoe() {
    this.shoeService.createShoe(this.shoe).subscribe(
      res => {
        this.toastr.success("Successfully created shoe!");
        this.getShoes();
      },
      error => console.log(error)
    );
  }
  deleteShoe(shoe, id) {
    this.shoeService.deleteShoe(shoe.id).subscribe(res => {
      this.shoes = this.shoes.filter(sh => sh.id !== shoe.id);
      this.dataSource = new MatTableDataSource(this.shoes);
    });
  }

  getShoes() {
    this.shoeService.getAllShoes().subscribe(res => {
      this.shoes = res;
      this.dataSource = new MatTableDataSource(this.shoes);
    });
  }

  getSizes() {
    this.shoeService.getAllSizes().subscribe(res => {
      this.sizes = res;
    });
  }

  isFormValid() {
    if (
      this.shoe.categoryId &&
      this.shoe.gender &&
      this.shoe.name &&
      this.shoe.price &&
      this.shoe.sizes.length > 0
    ) {
      return true;
    }
    return false;
  }
}
