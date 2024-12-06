import products from "@/app/products/page";
import { AddProductProps, AddReviewProps, EditGameInformationProps, IProduct, IReview } from "@/interfaces/IProduct";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchingProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await fetch(`${API_URL}/products`);

        // Verifica que la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            console.error(
                `Error fetching products: ${response.status} ${response.statusText}`
            );
            return [];
        }

        // Intenta parsear la respuesta como JSON
        const products = await response.json();

        // Verifica que el resultado sea un array
        if (Array.isArray(products)) {
            return products as IProduct[];
        } else {
            console.warn("The data fetched is not an array:", products);
            return [];
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};




export const fetchingProductByID = async (id: string): Promise<IProduct> => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const productByID = await response.json()
        return productByID;
    } catch (error) {
        throw new Error(`HTTP error! status: ${error}`);
    }
}

export const editProductInformationByID = async (product: EditGameInformationProps, token: string): Promise<EditGameInformationProps> => {

    console.log(product)
    debugger
    try {

        const response = await fetch(`${API_URL}/products/${product.id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        })


        if (!response.ok) {
            // Intenta capturar el cuerpo de la respuesta de error, si existe.
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        const newGameInfo = await response.json()
        console.log("Esta es la informacion nueva ", newGameInfo)
        debugger
        return newGameInfo;
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error(
            `Failed to update product: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export const addProduct = async (product: AddProductProps, token: string): Promise<EditGameInformationProps> => {

    const formData = new FormData();
    product.images.forEach((image: File) => {
        formData.append('images', image);
    });
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('stock', product.stock.toString());
    formData.append('categories', product.categories.toString())

    // product.categories.forEach((category: { id: string; name: string }) => {
    //     formData.append('categories', JSON.stringify(category)); // Serializar cada categoría como un string JSON
    // });

    console.log("Las categorias inyectadas son", product.categories)
    debugger
    // Añadir descuento al FormData
    formData.append('discount', product.discount.toString())



    // // Imprimir el contenido de FormData
    // for (const pair of formData.entries()) {
    //     console.log(pair[0], pair[1]);
    // }
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData // Pasar FormData directamente
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const newGameInfo = await response.json();
        console.log(newGameInfo);
        return newGameInfo;
    } catch (error) {
        console.error("Error updating product:", error);
        throw new Error(
            `Failed to update product: ${error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}

export const deleteProductByID = async (id: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response from server:", errorData);
            throw new Error(`Error deleting product: ${response.status} - ${response.statusText}`);
        }

        const productByID = await response.json();
        return productByID;
    } catch (error) {
        console.error("Fetch error:", error);
        throw new Error(`HTTP error! status: ${error}`);
    }
};


export const addReview = async (review: AddReviewProps, token: string) => {
    console.log(review);
    try {
        const response = await fetch(`${API_URL}/reviews`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Indica que el body es JSON
            },
            body: JSON.stringify(review), // Convierte el objeto a JSON
        });

        const newComment = await response.json();
        console.log(newComment);
        return newComment;
    } catch (error) {
        console.error("Error en addReview:", error);
        throw error;
    }
};

export const averageProductReview = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/reviews/${id}/average`);
        const data = await response.json();
        return data; // Asegúrate de devolver el objeto completo (con averageRating)
    } catch (error) {
        console.error("Error fetching average product review:", error);
        return null; // Devuelve null si hay un error
    }
};


export const deleteReview = async (id: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/reviews/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json()
    } catch (error) {
        console.log(error)
    }
}

export const getProductsHome = async () => {
    try {
        const response = await fetch(`${API_URL}/products/productsHome`)
        const products = await response.json()
        console.log(products)
        return products;
    } catch (error) {
        console.log(error)
    }
}

interface productId {
    id: string;
}

export const changeProductsHome = async (
    productsIdArr: productId[],
    token: string
) => {
    try {
        const response = await fetch(`${API_URL}/products/editProductsHome`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json", // Indica que el body es JSON
            },
            body: JSON.stringify(productsIdArr), // Convierte el objeto a JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json(); // Espera a que se resuelva la promesa
        console.log("Response JSON:", products);
        return products;
    } catch (error) {
        console.error("Error in changeProductsHome:", error);
        throw error; // Relanzar el error para manejarlo en el código que llama esta función
    }
};


export const getProductSuscription = async () => {
    try {
        const response = await fetch(`${API_URL}/products/productSuscription`)
        const products = await response.json()
        console.log(products)
        return products;
    } catch (error) {
        console.log(error)
    }
}

interface productId {
    id: string;
}

export const changeProductSuscription = async (
    productsIdArr: productId[],
    token: string
) => {
    try {
        const response = await fetch(`${API_URL}/products/editProductSuscription`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json", // Indica que el body es JSON
            },
            body: JSON.stringify(productsIdArr), // Convierte el objeto a JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json(); // Espera a que se resuelva la promesa
        console.log("Response JSON:", products);
        return products;
    } catch (error) {
        console.error("Error in changeProductsHome:", error);
        throw error; // Relanzar el error para manejarlo en el código que llama esta función
    }
};

export const reclaimeProduct = async (userId: string, productId: string, token: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${userId}/claim/${productId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const messageResponse = await response.json()
        return messageResponse;
    } catch (error) {
        console.log(error)
    }
}
