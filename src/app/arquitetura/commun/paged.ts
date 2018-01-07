export class Paged {

    size: number;
    page: number;
    sizeDB: number;
    pageIndex: number;
    filters: number[];

    constructor(searchSize?: number) { 
      this.page = 0; 
      this.size = searchSize ? searchSize : 5;
      this.sizeDB = 0;
      this.pageIndex = 0;  
      this.filters = [5, 10, 20, 50, 100];
   }
}