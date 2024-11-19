import { getOrderDetailById } from "@/helpers/orderHelper";
interface OrderDetailInformationProps {
    id: string;
    userToken: string;
}

const OrderDetailInformation: React.FC<OrderDetailInformationProps> = async ({ id, userToken }) => {

    const orderDetailInfromation = await getOrderDetailById(id, userToken)

    return (
        <div>
            {orderDetailInfromation?.orderDetail.map((product, index) => (
                <div key={index}>
                    <p>Product Name: {product.name}</p>
                    <p>Product Price: {product.price}</p>
                </div>
            ))}

        </div>
    );
};

export default OrderDetailInformation;