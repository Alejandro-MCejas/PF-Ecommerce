import { useAuth } from "@/context/Authcontext";
import { addProduct } from "@/helpers/productHelper";
import { AddProductProps } from "@/interfaces/IProduct";

const AddNewGameButton = ({ product }: { product: AddProductProps }) => {

    const {userData} = useAuth()
    const handleOnSubmit = async () => {
        if (!userData?.token) {
            console.error('User token is missing. Please log in again.');
            // Puedes mostrar un mensaje de error al usuario si el token está ausente
            return;
        }
    
        try {
            const newProduct = await addProduct(product, userData.token); // Aquí el token está garantizado como string
            console.log('Product added:', newProduct);
            // Puedes agregar más lógica aquí, como mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error adding product:', error);
            // Manejo de errores si la llamada falla
        }
    };
    

    return (
        <button
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            onClick={handleOnSubmit}
        >
            Add product
        </button>
    );
};



export default AddNewGameButton;
