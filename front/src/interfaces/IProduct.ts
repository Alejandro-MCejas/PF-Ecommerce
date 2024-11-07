
export interface IProduct {
    id:number,
    name: string,
    imagenBannerUrl: string,
    category: string,
    cyberGamer: boolean,
}

export interface EditGameModalProps {
    games: IProduct[];
    role: string;
}