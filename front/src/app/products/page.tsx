
import { CardProductsView } from "@/components/CardProductsView/CardProductsView"
import { exampleArrayProducs } from "../backHelper"
import { FilterForm } from "@/components/FilterForm/FilterForm"

const products = () => {
    return (
        <div>
            <div className="w-full h-[70px] bg-white flex justify-center items-center shadow-inner">
                <h1 className="font-black text-[48px]">All games</h1>
            </div>
            <div className="max-w-[1500px] w-full mx-auto mt-5">
                <div className="flex">
                    <div className="w-2/12">
                        <FilterForm/>
                    </div>
                    <div className="w-10/12 flex flex-wrap justify-center gap-3">
                    
                        {
                            exampleArrayProducs.map((game, index) => (
                                <CardProductsView
                                    key={index}
                                    product={game}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className=' flex h-screen justify-center items-center'>
                <div className='group text-xl'>
                    <strong className='group-hover:text-red-500'>Hover on me </strong>
                    <strong className='group-hover:text-green-500'>the texts will be </strong>
                    <strong className='group-hover:text-blue-500'>of different colors</strong>
                </div>
            </div>

            <div className="cards group flex flex-col gap-4">
                <div className="card red flex items-center justify-center h-24 w-64 rounded-lg text-white cursor-pointer transition-transform duration-400 bg-red-500 hover:scale-110 group-hover:blur-sm group-hover:scale-90">
                    <p className="tip text-lg font-bold">Card 1</p>
                    <p className="second-text text-sm">Additional info</p>
                </div>
                <div className="card blue flex items-center justify-center h-24 w-64 rounded-lg text-white cursor-pointer transition-transform duration-400 bg-blue-500 hover:scale-110 group-hover:blur-sm group-hover:scale-90">
                    <p className="tip text-lg font-bold">Card 2</p>
                    <p className="second-text text-sm">Additional info</p>
                </div>
                <div className="card green flex items-center justify-center h-24 w-64 rounded-lg text-white cursor-pointer transition-transform duration-400 bg-green-500 hover:scale-110 group-hover:blur-sm group-hover:scale-90">
                    <p className="tip text-lg font-bold">Card 3</p>
                    <p className="second-text text-sm">Additional info</p>
                </div>
            </div>


        </div>



    )
}
export default products