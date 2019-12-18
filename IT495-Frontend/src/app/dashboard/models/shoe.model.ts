import { Size } from "./size.model";

export class Shoe {
  id: number;
  categoryId: number;
  categoryName: string;
  deleted: Boolean;
  gender: string;
  imagePath: string;
  name: string;
  price: number;
  sizes: Size[];

  constructor(args: any) {
    this.id = args.id;
    this.categoryId = args.categoryId || 0;
    this.categoryName = args.categoryName || "";
    this.deleted = args.deleted || false;
    this.gender = args.gender;
    this.imagePath = args.imagePath;
    this.name = args.name || "";
    this.price = args.price || null;
    this.sizes = args.sizes = [];
  }
}
