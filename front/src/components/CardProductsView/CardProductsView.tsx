import { IProduct } from "@/interfaces/IProduct"
import Link from "next/link"

export const CardProductsView = ({product} : {product:IProduct})=>{
    return(
        <div key={product.id} className="md:max-w-[200px] md:max-h-[270px] md:min-w-[200px] md:min-h-[270px] flex justify-center items-center my-3 hover:scale-[1.05]">
            <Link href={`/products/${product.id}`}>
                <img src={product.image[0]} alt="" className="w-[100px] md:w-[200px] h-[120px] md:h-[270px] rounded-xl"/>
            </Link>
        </div>
    )
}