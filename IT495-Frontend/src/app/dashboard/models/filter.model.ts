export class Filter {
  dateFrom: Date;
  dateTo: Date;
  priceFrom: number;
  priceTo: number;
  idCategory: number;
  order: string;
  constructor() {
    this.dateFrom = null;
    this.dateTo = null;
    this.priceFrom = null;
    this.priceTo = null;
    this.idCategory = null;
    this.order = "Release Date Desc";
  }
}
