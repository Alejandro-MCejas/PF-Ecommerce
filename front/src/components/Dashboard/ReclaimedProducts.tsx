import { useAuth } from "@/context/Authcontext";
import { getUserById } from "@/helpers/userHelper";
import { IProduct } from "@/interfaces/IProduct";
import { useEffect, useState } from "react";

const ReclaimedProducts = () => {
    const { userData } = useAuth();
    const [claimedProducts, setClaimedProducts] = useState<IProduct[]>([]); // Estado para almacenar los productos reclamados

    useEffect(() => {
        if (userData) {
            const fetchingProductsReclaimed = async () => {
                try {
                    const userInformation = await getUserById(userData?.user.id , userData.token);
                    if(userInformation){
                        setClaimedProducts(userInformation.claimedProducts || []); 
                    }
                } catch (error) {
                    console.error("Error fetching claimed products:", error);
                }
            };

            fetchingProductsReclaimed();
        }
    }, [userData]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Reclaimed Products</h2>
            {claimedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {claimedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="border rounded-lg p-4 shadow hover:shadow-md"
                        >
                            <img
                                src={product.image[0]}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-lg mb-2"
                            />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                            <p className="font-bold text-blue-500">${product.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reclaimed products found.</p>
            )}
        </div>
    );
};

export default ReclaimedProducts;
