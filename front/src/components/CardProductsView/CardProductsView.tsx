import { IProduct } from "@/interfaces/IProduct"
import Link from "next/link"

export const CardProductsView = ({product} : {product:IProduct})=>{
    return(
        <div key={product.id} className="max-w-[200px] max-h-[270px] min-w-[200px] min-h-[270px] flex justify-center items-center my-3 hover:scale-[1.05]">
            <Link href={`/products/${product.id}`}>
                <img src={product.image[0]} alt="" className="w-[200px] h-[270px] rounded-xl"/>
            </Link>
        </div>
    )
}