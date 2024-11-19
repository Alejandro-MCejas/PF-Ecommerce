
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { useAuth } from "@/context/Authcontext";
import { fetchingProductByID } from "@/helpers/productHelper";

// const productId = async ({params}: { params: { productID: string }}) => {

//     const productByID = await fetchingProductByID(params.productID)
//     console.log(productByID)
//     const role = "admin"
//     return (
//         <div className="max-w-[1500px] w-full mx-auto flex flex-col justify-center items-center">
//             <ProductDetail
//                 role={role}
//                 product={productByID}
//             />
//         </div>
//     )
// }

// export default productId;

interface ProductPageProps {
    params: Promise<{ productID: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { productID } = await params;
    // Asegúrate de usar await para resolver la promesa correctamente
    const productByID = await fetchingProductByID(productID);



    return (
        <div className="max-w-[1500px] w-full mx-auto flex flex-col justify-center items-center">
            <ProductDetail  product={productByID} />
        </div>
    );
};

export default ProductPage;
