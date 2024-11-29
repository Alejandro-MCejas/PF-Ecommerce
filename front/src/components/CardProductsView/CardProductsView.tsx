import { IProduct } from "@/interfaces/IProduct";
import Link from "next/link";

export const CardProductsView = ({ product }: { product: IProduct }) => {
    return (
        <div
            key={product.id}
            className="relative md:max-w-[200px] md:max-h-[270px] md:min-w-[200px] md:min-h-[270px] flex justify-center items-center my-3 hover:scale-[1.05] z-10"
        >
            {/* Mostrar el círculo rojo si discount > 0 */}
            {product.discount > 0 && (
                <div className="absolute top-1 right-1 p-4 w-[50px] h-[50px] bg-red-500 rounded-full flex justify-center items-center">
                    <p className="text-white font-bold text-sm">{parseInt(product.discount.toString(), 10)}%</p>
                </div>
            )}

            {/* Contenido de la carta */}
            <Link href={`/products/${product.id}`}>
                <img
                    src={product.image[0]}
                    alt=""
                    className="w-[100px] md:w-[200px] h-[120px] md:h-[270px] rounded-xl"
                />
            </Link>
        </div>
    );
}; 
