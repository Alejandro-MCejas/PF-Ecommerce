import { ICategories } from "@/interfaces/ICategories";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchingCategories = async():Promise<ICategories[]> =>{
    try{
        const response = await fetch(`${API_URL}/categories`);
        const categories = await response.json()
        // console.log(categories)
        return categories;
    }catch(error){
        console.error("Error fetching categories:" , error);
        return[]
    }
}

interface ICategoryById {
    id:string,
    name:string,
    products:[]
}

export const fetchingCategoriesById = async(id:string | null):Promise<ICategoryById> =>{
    try{
        const response = await fetch(`${API_URL}/categories/${id}`);
        const categoriesByid = await response.json()
        return categoriesByid;
    }catch(error){
        throw new Error("Error fetching categories")
        console.error("Error fetching categories:" , error);
        // return null
    }
}