import { ILoginProps, IRegisterProps } from "@/interfaces/IRegisterProp";


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;




//CREAR USUARIO
export async function register(userData: IRegisterProps, parentId?: string) {
  console.log(userData);

  try {
    const url = new URL(`${APIURL}/auth/signup`);
    // Añadir parentId como parámetro de consulta si está disponible
    if (parentId) {
      url.searchParams.append("parentId", parentId);
    }
    console.log(url);

    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(res);

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
export async function updateUser(
  userId: string,
  updateData: Partial<IRegisterProps>,
  token: string
) {
  try {
    const res = await fetch(`${APIURL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        `Error ${res.status}: ${errorData.message || "Failed to update user"}`
      );
    }

    return await res.json();
  } catch (error: any) {
    console.error("Update user error:", error.message);
    throw new Error(
      error.message || `Unknown error occurred during updating user.`
    );
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

// Login
export async function login(userData: ILoginProps) {
  try {
    const res = await fetch(`${APIURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData)
    });
  
    if (res.ok) {
      return res.json()
    } else {
      throw Error("faild to login")
    }

  } catch (error: any) {
    throw new Error(error)
  }
}

// auth.helper.ts

/*
const mockUsers = [
  { name: "admin", password: "admin123", role: "administrator" },
  { name: "user", password: "user123", role: "user" },
  { name: "controller", password: "controller123", role: "controller" },
];

export async function login(userData: ILoginProps) {
  const user = mockUsers.find(
    (u) => u.name === userData.name && u.password === userData.password
  );
  
  if (user) {
    const mockResponse = {
      token: "fake-jwt-token",
      user: {
        id: Date.now(),
        name: user.name,
        role: user.role,
      },
    };
    return mockResponse;
  } else {
    throw new Error("Failed to login: Incorrect username or password");
  }

}*/
export async function getTokken() {
  try {
    const res = await fetch(`localhost:3000/auth/profile`, {
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

export const getToken2Prueba = async () => {
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'GET',
      credentials: 'include', // Para enviar cookies o encabezados de autenticación
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido esperado
      },
    });

    if (!res.ok) {
      throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
};


