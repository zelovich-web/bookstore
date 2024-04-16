export interface BookData  {
    title?: string;
    desc?: string;
    authors?:string | Array<>;
    image?:string;
    price: string;
    publisher?:string;
    language?:string;
    selectedInfo?:string;
    rating?:string;
    isbn13?:string ;
    year?:string;
    quantity:number

  }