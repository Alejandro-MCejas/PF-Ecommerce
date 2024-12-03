import { useState } from "react";
import { fetchingProducts } from "@/helpers/productHelper";
import { IProduct } from "@/interfaces/IProduct";
import Link from "next/link";

const Search = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<IProduct[]>([]);
    const [showResults, setShowResults] = useState(false); // Estado para controlar la visibilidad de los resultados

    const handleSearch = async (value: string) => {
        if (value.trim() === "") {
            setResults([]); // Resetea los resultados si no hay texto
            setShowResults(false); // Oculta los resultados si el campo está vacío
            return;
        }
    
        try {
            // Traemos todos los productos
            const products = await fetchingProducts(" "); // No pasamos query, traemos todos los productos
            // Filtramos los productos por el nombre
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase()) // Filtramos por nombre
            );
            setResults(filteredProducts);
            setShowResults(true); // Muestra los resultados cuando hay productos encontrados
        } catch (error) {
            console.error("Error when searching for products:", error);
        }
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value); // Realiza la búsqueda al escribir
    };

    const handleProductClick = () => {
        setShowResults(false); // Oculta los resultados cuando el usuario selecciona un producto
    };

    return (
        <div className="w-full max-w-md mx-auto relative">
            {/* Campo de búsqueda */}
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full px-4 py-2 text-gray-900 bg-white rounded-full outline-none focus:ring-2 focus:ring-[#A065FF]"
            />

            {/* Lista desplegable de resultados */}
            {showResults && results.length > 0 && (
                <ul className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg">
                    {results.map((product) => (
                        <li
                            key={product.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <Link href={`/products/${product.id}`} passHref>
                                <div onClick={handleProductClick}>{product.name}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
