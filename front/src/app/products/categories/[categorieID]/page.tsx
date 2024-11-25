import { CardProductsView } from "@/components/CardProductsView/CardProductsView";
import { FilterForm } from "@/components/FilterForm/FilterForm";
import { fetchingCategoriesById } from "@/helpers/categoiresHelper";
import { IAllCategories } from "@/interfaces/ICategories";
import { IProduct } from "@/interfaces/IProduct";

interface ICategoryFilter {
    id: string,
    name: string,
    products: IProduct[]
}

const categorieID = async ({ params }: IAllCategories) => {


    const filterProducts: ICategoryFilter = await fetchingCategoriesById((await params).categorieID)

    return (
        <div>
            <div className="w-full h-[70px] bg-white flex justify-center items-center shadow-inner">
                <h1 className="font-bold text-[48px]">{filterProducts.name}</h1>
            </div>

            <div className="max-w-[1500px] w-full mx-auto mt-5">
                <div className="flex">
                    <div className="w-2/12">
                        <FilterForm />
                    </div>
                    <div className="w-10/12 flex flex-wrap justify-center gap-3">
                        {filterProducts.products.map((product) => (
                            <CardProductsView
                                key={product.id}
                                product={product} // Pass each product to the component
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default categorieID;