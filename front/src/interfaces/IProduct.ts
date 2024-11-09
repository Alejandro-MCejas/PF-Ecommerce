
export interface IProduct {
    id:number,
    name: string,
    imagenesGaleria: string[],
    category: string,
    price:number,
    stock:number,
    cyberGamer: boolean,
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