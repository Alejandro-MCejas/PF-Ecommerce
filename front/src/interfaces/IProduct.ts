
export interface IProduct {
    id:string,
    name: string,
    image: string[],
    category?: string,
    price:number,
    stock:number,
    suscription: boolean,
    description:string
}

export interface EditGameModalProps {
    games: IProduct[];
    role: string;
}

export interface AddProductProps{
    role:string;
    // game:IProduct;
}

export interface ProductDetail {
    product : IProduct;
}

export interface EditGameInformationProps{
    id:string,
    name:string,
    price:number,
    stock:number,
    // suscription:boolean,
    description:string
}
