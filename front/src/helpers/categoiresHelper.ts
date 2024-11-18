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