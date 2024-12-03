import { ICategories } from "./ICategories"

export interface IReview{
    id:string,
    rating:number,
    comment:string
}

export interface AddReviewProps {
    productId:string,
    userId:string,
    rating:number,
    comment:string
}

export interface Categories {
    id:string,
    name:string
}

export interface IProduct {
    id:string,
    name: string,
    image: string[],
    categories: Categories[],
    price:number,
    stock:number,
    suscription?: boolean,
    description:string
    reviews:IReview[]
    discount:number,
    discountedPrice: number,
    discountStartDate?: Date,
    discountEndDate?:Date
}

export interface IProductOrderDetailInfo {
    id:string,
    name: string,
    image: string[],
    categories: Categories[],
    price:number
}

export interface IProductCart { 
    id:string,
    name: string,
    image: string[],
    quantity?:number
    price:number,
    stock:number,
    suscription?: boolean,
    description:string
    discount:number,
    discountedPrice: number
}

export interface EditGameModalProps {
    games: IProduct[];
}

export interface AddProductProps{
    name:string,
    images: File[],
    description:string,
    stock:number,
    suscription:boolean,
    price:number,
    categories: string,
    discount:number
}

export interface ProductDetail {
    product : IProduct;
}

export interface EditGameInformationProps{
    id:string,
    name?:string,
    price?:number,
    stock?:number,
    suscription?:boolean,
    description?:string
    discount?:number
    discountStartDate?: Date,
    discountEndDate?:Date
}


export interface CardCartProp { 
    id:string
    name:string,
    image:string[],
    stock:number,
    price:number,
    quantity?:number,
    onDelete: () => void
}
