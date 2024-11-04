import { IRegisterProps } from "@/interfaces/IRegisterProp";


const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;
export async function register(userData: IRegisterProps, parentId?: string) {
    try {
      const url = new URL(`${APIURL}/auth/sigUp`);
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