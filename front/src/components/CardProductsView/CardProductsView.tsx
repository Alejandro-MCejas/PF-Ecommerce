import { IProduct } from "@/interfaces/IProduct"
import Link from "next/link"

export const CardProductsView = ({product} : {product:IProduct})=>{
    return(
        <div key={product.id} className="max-w-[200px] max-h-[270]  flex justify-center items-center my-3 hover:scale-[1.05]">
            <Link href={`/products/${product.id}`}>
                <img src={product.imagenBannerUrl} alt="" className="w-full h-full rounded-xl"/>
            </Link>
        </div>
    )
}