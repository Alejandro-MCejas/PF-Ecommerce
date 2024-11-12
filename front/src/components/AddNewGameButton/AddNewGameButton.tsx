import { addProduct } from "@/helpers/productHelper";
import { AddProductProps } from "@/interfaces/IProduct";

const AddNewGameButton = ({ product }: { product: AddProductProps }) => {

    const handleOnSumbit = async () => { // Cambiado a async
        // const formData = new FormData();
        // formData.append('name', product.name);
        // formData.append('description', product.description);
        // formData.append('price', product.price.toString());
        // formData.append('stock', product.stock.toString());
        // formData.append('suscription', product.suscription.toString());
        try {
            const newProduct = await addProduct(product);
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
            onClick={handleOnSumbit}
        >
            Add product
        </button>
    );
};



export default AddNewGameButton;
