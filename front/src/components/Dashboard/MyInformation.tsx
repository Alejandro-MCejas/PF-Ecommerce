import { useAuth } from "@/context/Authcontext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { updateUser } from "@/helpers/auth.helper";
import SubscriptionStatus from "../YouSubscribed/YouSubscribed";
import Swal from "sweetalert2";

const MyInformation = () => {
    const { userData, setUserData } = useAuth(); // Obtener los datos del usuario desde el contexto
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // Control de estado para guardar
    console.log(userData);

    // Sincronizar valores iniciales cuando `userData` cambia
    useEffect(() => {
        if (userData?.user) {
            setUserName(userData.user.name || "");
            setUserEmail(userData.user.email || "");
            setUserAddress(userData.user.address || "");
            setUserPhone(userData.user.phone || "");
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setUserName(value);
                break;
            case "email":
                setUserEmail(value);
                break;
            case "address":
                setUserAddress(value);
                break;
            case "phone":
                setUserPhone(value);
                break;
            default:
                break;
        }
    };

    // const handleSave = async () => {
    //     const userId = userData?.user?.id;
    //     const token = userData?.token;

    //     if (!userId || !token) {
    //         Swal.fire({
    //             title: "Error",
    //             text: "No se encontró el ID del usuario o el token. Por favor, inicie sesión nuevamente.",
    //             icon: "error",
    //             confirmButtonText: "OK",
    //         });
    //         return;
    //     }

    //     setIsSaving(true); // Activar el indicador de carga
    //     try {
    //         const updatedUser = await updateUser(
    //             userId,
    //             {
    //                 name: userName,
    //                 email: userEmail,
    //                 address: userAddress,
    //                 phone: userPhone,
    //             },
    //             token
    //         );

    //         setUserData({
    //             token: userData.token, // Mantener el token
    //             user: updatedUser, // Actualizar los datos del usuario en el contexto
    //         });

    //         setIsEditing(false); // Salir del modo de edición
    //         Swal.fire({
    //             title: "Actualización exitosa",
    //             text: "Los datos del usuario se actualizaron correctamente.",
    //             icon: "success",
    //             confirmButtonText: "OK",
    //         });
    //     } catch (error: any) {
    //         Swal.fire({
    //             title: "Error al actualizar",
    //             text: error.message || "No se pudieron actualizar los datos del usuario.",
    //             icon: "error",
    //             confirmButtonText: "OK",
    //         });
    //     } finally {
    //         setIsSaving(false); // Desactivar el indicador de carga
    //     }
    // };

    return (
        <form className="space-y-4">
            <div className="flex flex-col">
                <label className="text-gray-700">Full name</label>
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    name="name"
                    value={userName}
                    onChange={handleChange}
                    placeholder="Full name"
                    disabled={!isEditing}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Email</label>
                <input
                    type="text"
                    className="p-2 border border-gray-300 rounded-lg"
                    name="email"
                    value={userEmail}
                    onChange={handleChange}
                    placeholder="Email"
                    disabled={!isEditing}
                />
            </div>
            <div className="flex space-x-4">
                <div className="flex-1 flex flex-col">
                    <label className="text-gray-700">Address</label>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-lg"
                        name="address"
                        value={userAddress}
                        onChange={handleChange}
                        placeholder="Address"
                        disabled={!isEditing}
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <label className="text-gray-700">Phone number</label>
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-lg"
                        name="phone"
                        value={userPhone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        disabled={!isEditing}
                    />
                </div>
            </div>

            <SubscriptionStatus />

            <div className="flex justify-center">
                {isEditing ? (
                    <button
                        type="button"
                        // onClick={handleSave}
                        disabled={isSaving} // Desactivar mientras se guarda
                        className={`px-6 py-3 rounded-lg font-semibold mt-4 ${isSaving ? "bg-gray-400" : "bg-purple-500 text-white"
                            }`}
                    >
                        {isSaving ? "Saving..." : "Save Information"}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold mt-4"
                    >
                        Edit your information
                    </button>
                )}
            </div>
        </form>
    );
};

export default MyInformation;
