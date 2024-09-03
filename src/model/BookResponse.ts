export class BookResponse {
    [x: string]: any;
    id!: number;
    name!: string;
    description!: string;
    quantity!: number;
    price!: number;
    authorName!: string;
    discountPrice!: number;
    createdAt!: Date;
    updateAt!: Date;
    bookImage!:string|null|undefined
  }
  