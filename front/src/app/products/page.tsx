
import { CardProductsView } from "@/components/CardProductsView/CardProductsView"
import { FilterForm } from "@/components/FilterForm/FilterForm"
import FilterFormMobile from "@/components/FilterFormMobile/FilterFormMobile"
import AddGame from "@/components/ModalAddGame/ModalAddGame"
import { fetchingCategories } from "@/helpers/categoiresHelper"
import { fetchingProducts } from "@/helpers/productHelper"

const products = async () => {
    const products = await fetchingProducts();
    const allCategories = await fetchingCategories()
    return (
        <div>
            <div className="w-full h-[70px] bg-white flex justify-center items-center shadow-inner">
                <h1 className="font-bold text-[30px] md:text-[48px]">All games</h1>
            </div>
            <div className="max-w-[1500px] w-full mx-auto flex justify-center items-center z-50">
                <AddGame
                    categories={allCategories}
                />
            </div>
            <div className="block md:hidden">
                <FilterFormMobile />
            </div>
            <div className="max-w-[1500px] w-full mx-auto mt-5 z-10">
                <div className="flex">
                    <div className="w-2/12 hidden md:block z-10">
                        <FilterForm />
                    </div>

                    <div className="w-full md:w-10/12 flex flex-wrap justify-center gap-3">
                        {
                            products.map((game, index) => (
                                <CardProductsView
                                    key={index}
                                    product={game}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default products