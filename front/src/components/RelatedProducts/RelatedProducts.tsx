"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchingCategoriesById } from "@/helpers/categoiresHelper";

interface IProduct {
    id: string;
    image: string[];
}

interface RelatedProductsProps {
    categories: { id: string; name: string }[]; // Recibe un array de categorías
    excludeProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categories, excludeProductId }) => {
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        // Toma el primer categoryId del array de categorías
        const categoryId = categories.length > 0 ? categories[0].id : null;

        console.log("Category ID:", categoryId);

        if (!categoryId) {
            console.error("Category ID is undefined or invalid.");
            return;
        }

        const fetchRelatedProducts = async () => {
            try {
                const categoryData = await fetchingCategoriesById(categoryId);
                console.log("Category Data:", categoryData);

                if (!Array.isArray(categoryData.products)) {
                    console.error("Invalid products data:", categoryData.products);
                    return;
                }

                const randomProducts = categoryData.products
                    .filter((p: IProduct) => p.id !== excludeProductId)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);

                setRelatedProducts(randomProducts);
            } catch (error) {
                console.error("Error fetching related products:", error);
            }
        };

        fetchRelatedProducts();
    }, [categories, excludeProductId]);

    if (!relatedProducts.length) {
        return <p>No related products found for this category.</p>;
    }

    return (
        <div>
            <h2 className="ml-10 my-5 text-[38px] text-gray-400 font-semibold">
                Other games like this:
            </h2>
            <div className="w-full flex justify-evenly items-center">
                {relatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex justify-center items-center my-3 hover:scale-[1.05]"
                    >
                        <Link href={`/products/${product.id}`}>
                            <img
                                src={product.image[0]}
                                alt={product.id}
                                className="w-full h-full rounded-xl max-w-[200px] max-h-[270px] min-w-[200px] min-h-[270px]"
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;

