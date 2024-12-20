
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import RelatedProducts from "@/components/RelatedProducts/RelatedProducts";
import ReviewGames from "@/components/ReviewGames/ReviewGames";
import { useAuth } from "@/context/Authcontext";
import { fetchingProductByID } from "@/helpers/productHelper";


interface ProductPageProps {
    params: Promise<{ productID: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { productID } = await params;
    const productByID = await fetchingProductByID(productID);
   
    debugger
    return (
        <div>
            <div className="max-w-[1500px] p-4 w-full mx-auto flex flex-col justify-center items-center">
                <ProductDetail 
                    product={productByID} 
                />
            </div>
            <div className="max-w-[1500px] w-full mx-auto">
                <RelatedProducts
                    categories={productByID.categories}
                    excludeProductId={productByID.id}
                />
            </div>
            <div className="max-w-[1500px] w-full mx-auto">
                <ReviewGames
                    product={productByID}
                />
            </div>
        </div>
    );
};

export default ProductPage;
