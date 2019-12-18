import { Shoe } from "./shoe.model";
import { Size } from "./size.model";

export class Items {
  id: number;
  quantity: number;
  shoe: Shoe;
  size: Size;
  shoeId: number;
  constructor(args: any = {}) {
    this.id = args.id;
    this.quantity = args.quantity || 1;
    this.shoe = args.shoe;
    this.size = args.size;
    this.shoeId = args.shoeId;
  }
}
