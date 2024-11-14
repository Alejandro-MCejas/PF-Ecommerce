
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { fetchingProductByID } from "@/helpers/productHelper";
import { IProduct } from "@/interfaces/IProduct";


const productId = async ({params}: { params: { productID: string }}) => {

    const productByID = await fetchingProductByID(params.productID)
    console.log(productByID)
    const role = "admin"
    return (
        <div className="max-w-[1500px] w-full mx-auto flex flex-col justify-center items-center">
            <ProductDetail
                role={role}
                product={productByID}
            />
        </div>
    )
}

export default productId;