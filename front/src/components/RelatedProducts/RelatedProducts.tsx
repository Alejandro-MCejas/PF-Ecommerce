"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchingCategoriesById } from "@/helpers/categoiresHelper";

interface IProduct {
    id: string;
    image: string[];
}

interface RelatedProductsProps {
    categories: { id: string; name: string }[];
    excludeProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ categories, excludeProductId }) => {
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(2); // Cambia dinámicamente entre 2 o 4

    useEffect(() => {
        // Determinar cantidad de slides visibles según el tamaño de la pantalla
        const handleResize = () => {
            const width = window.innerWidth;
            setVisibleSlides(width >= 768 ? 4 : 2); // 4 en pantallas grandes, 2 en móviles
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Ejecutar al cargar la página

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const categoryId = categories.length > 0 ? categories[0].id : null;

        if (!categoryId) {
            console.error("Category ID is undefined or invalid.");
            return;
        }

        const fetchRelatedProducts = async () => {
            try {
                const categoryData = await fetchingCategoriesById(categoryId);

                if (!Array.isArray(categoryData.products)) {
                    console.error("Invalid products data:", categoryData.products);
                    return;
                }

                const randomProducts = categoryData.products
                    .filter((p: IProduct) => p.id !== excludeProductId)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 8); // Obtén hasta 8 productos para el carrusel

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

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? relatedProducts.length - visibleSlides : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === relatedProducts.length - visibleSlides ? 0 : prevIndex + 1
        );
    };

    return (
        <div>
            <h2 className="ml-10 my-5 text-[38px] text-gray-400 font-semibold">
                Other games like this:
            </h2>
            <div className="relative w-full overflow-hidden">
                {/* Botón anterior */}
                <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500 text-white p-2 rounded-full"
                    onClick={handlePrev}
                >
                    {"<"}
                </button>

                {/* Carrusel */}
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                        width: `${(relatedProducts.length / visibleSlides) * 100}%`,
                    }}
                >
                    {relatedProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex justify-center items-center flex-shrink-0 px-2"
                            style={{
                                flexBasis: `${100 / visibleSlides}%`,
                            }}
                        >
                            <Link href={`/products/${product.id}`}>
                                <div className="w-[200px] h-[270px] flex justify-center items-center rounded-xl overflow-hidden">
                                    <img
                                        src={product.image[0]}
                                        alt={product.id}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Botón siguiente */}
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-blue-500 text-white p-2 rounded-full"
                    onClick={handleNext}
                >
                    {">"}
                </button>
            </div>


        </div>
    );
};

export default RelatedProducts;
