import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchingCategoriesById } from "@/helpers/categoiresHelper";


interface IProduct {
    id: string;
    image: string[];
}

interface RelatedProductsProps {
    categoryId: string; // ID de la categoría del producto actual
    excludeProductId: string; // ID del producto actual para excluirlo
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categoryId, excludeProductId }) => {
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const categoryData = await fetchingCategoriesById(categoryId);
                const randomProducts = categoryData.products
                    .filter((p: IProduct) => p.id !== excludeProductId) // Excluir producto actual
                    .sort(() => 0.5 - Math.random()) // Barajar productos
                    .slice(0, 4); // Seleccionar 4 productos al azar

                setRelatedProducts(randomProducts);
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        fetchRelatedProducts();
    }, [categoryId, excludeProductId]);

    if (!relatedProducts.length) {
        return <p>Loading related products...</p>;
    }

    return (
        <div>
            <h2 className="ml-10 my-5 text-[38px] text-gray-400 font-semibold">
                Other games like this:
            </h2>
            <div className="max-w-[1500px] w-full flex justify-evenly items-center">
                {relatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="max-w-[200px] max-h-[270px] flex justify-evenly items-center my-3 hover:scale-[1.05]"
                    >
                        <Link href={`/products/${product.id}`}>
                            <img
                                src={product.image[0]}
                                alt={product.id}
                                className="w-full h-full rounded-xl"
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
