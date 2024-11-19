import CartView from "@/components/CartView/CartCard";

const cart = async () => {

    

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full h-[50px] flex justify-center items-center shadow-inner bg-white">
                <h2 className="font-bold text-[30px]">Your cart</h2>
            </div>
            <div className="w-full mx-auto max-w-[1500px] min-h-[700px]">
                <CartView />
            </div>
            

        </div>
    )
}

export default cart;