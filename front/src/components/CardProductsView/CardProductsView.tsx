import { IProduct } from "@/interfaces/IProduct";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const CardProductsView = ({ product }: { product: IProduct }) => {
    return (
        <div
            key={product.id}
            className="relative md:max-w-[200px] md:max-h-[270px] md:min-w-[200px] md:min-h-[270px] flex justify-center items-center my-3 hover:scale-[1.05] z-10"
        >
            {/* Mostrar el tag si discount > 0 */}
            {product.discount > 0 && (
                <div className="absolute top-0 right-0 flex items-center bg-transparent">
                    <FontAwesomeIcon
                        icon={faTag}
                        className="text-red-500 w-[70px] h-[70px]"
                    />
                    <p className="absolute top-6 right-3 text-white text-lg font-bold">
                        {parseInt(product.discount.toString(), 10)}%
                    </p>
                </div>
            )}

            {/* Contenido de la carta */}
            <Link href={`/products/${product.id}`}>
                <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-[100px] md:w-[200px] h-[120px] md:h-[270px] rounded-xl"
                />
            </Link>
        </div>
    );
};
