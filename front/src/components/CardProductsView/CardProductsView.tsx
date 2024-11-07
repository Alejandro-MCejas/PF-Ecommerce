import { IProduct } from "@/interfaces/IProduct"

export const CardProductsView = ({product} : {product:IProduct})=>{
    return(
        <div className="max-w-[200px] max-h-[270]  flex justify-center items-center my-3 hover:scale-[1.05]">
            <img src={product.imagenBannerUrl} alt="" className="w-full h-full rounded-xl"/>
        </div>
    )
}