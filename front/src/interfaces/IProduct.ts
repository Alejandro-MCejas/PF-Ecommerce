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
    price:number
}

export interface ProductDetail {
    product : IProduct;
}

export interface EditGameInformationProps{
    id:string,
    name:string,
    price:number,
    stock:number,
    suscription?:boolean,
    description:string
}


export interface CardCartProp { 
    id:string
    name:string,
    image:string[],
    stock:number,
    price:number,
    onDelete: () => void
}