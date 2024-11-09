import { ILoginProps, IRegisterProps } from "@/interfaces/IRegisterProp";


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
console.log(APIURL)



//CREAR USUARIO
export async function register(userData: IRegisterProps, parentId?: string) {
  console.log(userData);
  
    try {
      const url = new URL(`${APIURL}/users`);
      // Añadir parentId como parámetro de consulta si está disponible
      if (parentId) {
        url.searchParams.append("parentId", parentId);
      }
  
      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!res.ok) {
        const errorData = await res.json(); // Obtener los detalles del error
        throw new Error(
          `Error ${res.status}: ${errorData.message || "Failed to register"}`
        );
      }
      return await res.json();
    } catch (error: any) {
      console.error("Registration error:", error.message);
      throw new Error(
        error.message || `Unknown error occurred during registration.`
      );
    }
  }

 //USUARIO POR ID
 export async function getUser(userId: string) {
  try {
    const res = await fetch(`${APIURL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.message || "Failed to fetch user"}`);
    }
    return await res.json();
  } catch (error: any) {
    console.error("Fetch user error:", error.message);
    throw new Error(error.message || `Unknown error occurred during fetching user.`);
  }
}

//ACTUALIZAR USUARIO
export async function updateUser(userId: string, updateData: Partial<IRegisterProps>) {
  try {
    const res = await fetch(`${APIURL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.message || "Failed to update user"}`);
    }
    return await res.json();
  } catch (error: any) {
    console.error("Update user error:", error.message);
    throw new Error(error.message || `Unknown error occurred during updating user.`);
  }
}
//ELIMINAR USUARIO
export async function deleteUser(userId: string) {
  try {
    const res = await fetch(`${APIURL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error ${res.status}: ${errorData.message || "Failed to delete user"}`);
    }
    return await res.json();
  } catch (error: any) {
    console.error("Delete user error:", error.message);
    throw new Error(error.message || `Unknown error occurred during deleting user.`);
  }
}
// Obtener todos los usuarios
export async function getAllUsers() {
  try {
    const res = await fetch(`${APIURL}/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error(`Error ${res.status}: ${errorData.message || "Failed to fetch users"}`);
      return []; // Devuelve un array vacío en caso de error
    }
    return await res.json();
  } catch (error: any) {
    console.error("Fetch users error:", error.message);
    return []; // Devuelve un array vacío en caso de error
  }
}

