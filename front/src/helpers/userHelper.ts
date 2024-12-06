import { IOrder } from "@/interfaces/IOrder";
import { IProduct } from "@/interfaces/IProduct";

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
const AUTH0: string | undefined = process.env.NEXT_PUBLIC_AUTH0_BASE_URL;

interface userById {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  isSuscription: boolean;
  orders: IOrder[];
  claimedProducts: IProduct[]
}

export const getUserById = async (userId: string, token: string): Promise<userById | undefined> => {
  try {
    const res = await fetch(`${APIURL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${token}`, // si es necesario
      },
    });
    const userInformation = res.json()
    return userInformation
  } catch (error) {
    console.log("The error was", error)
  }
}


export const getFavorites = async (userId: string , token:string): Promise<IProduct[]> => {
  try {
    const response = await fetch(`${APIURL}/users/${userId}/favorites`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch favorites: ${response.statusText}`);
    }

    const favoriteProducts = await response.json();

    // Asegúrate de que `favoriteProducts` sea un arreglo
    if (Array.isArray(favoriteProducts)) {
      return favoriteProducts;
    } else {
      console.warn("Favorites data is not an array:", favoriteProducts);
      return []; // Retorna un arreglo vacío si no es un arreglo
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return []; // Retorna un arreglo vacío en caso de error
  }
};


export const eliminateFavorite = async (userId: string, productId: string, token: string): Promise<IProduct[] | undefined> => {
  try {
    const response = await fetch(`${APIURL}/users/${userId}/favorites/${productId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    const favoriteProducts = response.json()
    return favoriteProducts
  } catch (error) {
    console.log(error)
  }
}



export const addFavorite = async (userId: string, productId: string, token: string): Promise<IProduct[] | undefined> => {
  try {
    const response = await fetch(`${APIURL}/users/${userId}/favorites/${productId}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    const favoriteProducts = response.json()
    return favoriteProducts
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    const response = await fetch(`${APIURL}/auth/logout`, {
      method: 'GET',
      mode: 'no-cors',
    })
    if (!response.ok) {
      console.log('Logout failed');
    } else {
      console.log('Logout request sent successfully');
    }
  } catch (error) {
    console.log("Error en el logout")
  }
}