export interface ICategories {
    id:string,
    name:string
}


export interface IAllCategories {
    params: Promise<{ categorieID: string }>;
}