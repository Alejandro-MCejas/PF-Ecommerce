
import { exampleArrayProducs } from "@/app/backHelper";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { IProduct } from "@/interfaces/IProduct";


const productId = async ({ params, products }: { params: { productID: string }, products: IProduct[] }) => {

    const ID = parseInt(params.productID);
    const product: IProduct = await exampleArrayProducs.filter((product) => product.id === ID)[0];

    const role = "admin"
    return (
        <div className="max-w-[1500px] w-full mx-auto flex flex-col justify-center items-center">
            <ProductDetail
                role={role}
                product={product}
            />
        </div>
    )
}

export default productId;