import { CardCartProp } from "@/interfaces/IProduct";
import StockCounter from "../StockCounter/StockCounter";


const CardCart: React.FC<CardCartProp> = ({name, id, price, stock, image,onDelete})=>{
    return(
        <div className="w-full bg-white md:max-w-[1500px] md:max-h-[200px] h-full flex flex-col md:flex-row justify-evenly items-center">
            <div className="p-2">
                <img src={image[0]} alt="" className="max-w-[120px] max-h-[180px] rounded-sm"/>
            </div>
            <div className="flex flex-col w-full max-w-[600px] justify-evenly items-center gap-3">
                <h2 className="w-3/4 md:w-full bg-violet-200 text-black font-bold text-center text-[20px] rounded-sm shadow-md">{name}</h2>
                <div className="flex w-full justify-center md:justify-between">
                    <button className="w-3/4 md:w-[280px] bg-purple-700 text-white font-bold text-center rounded-sm shadow-md" onClick={onDelete}>Eliminate</button>
                    <button className="w-[280px] bg-purple-700 text-white font-bold text-center rounded-sm shadow-md hidden md:block">Buy now</button>
                </div>
                {/* <h2 className="w-full flex justify-end items-center text-black font-bold text-[20px]">Shipping cost</h2> */}
            </div>
            <div className="p-2 md:p-0">
                <StockCounter
                    initialStock={1}
                    idProduct={id}
                    maxStock={stock - 1 }
                />
            </div>
            <div className="flex flex-col justify-between items-end">
                <h2 className="text-[40px] font-bold">${price}</h2>
                {/* <h2 className="text-[20px] font-semibold">$5</h2> */}
            </div>
        </div>
    )
}


export default CardCart;