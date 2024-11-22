import { useAuth } from "@/context/Authcontext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { updateUser } from "@/helpers/auth.helper"; // Asegúrate de que esta función esté correctamente importada

const MyInformation = () => {
  const { userData, setUserData } = useAuth(); // Obtener los datos del usuario desde el contexto
  const [userName, setUserName] = useState(userData?.user?.name || "");
  const [userEmail, setUserEmail] = useState(userData?.user?.email || "");
  const [userAddress, setUserAddress] = useState(userData?.user?.address || "");
  const [userPhone, setUserPhone] = useState(userData?.user?.phone || "");

  const [isEditing, setIsEditing] = useState(false); // Para controlar si está en modo de edición

  // Función para manejar el cambio de valor de los campos
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

  // Función para actualizar la información del usuario
  const handleSave = async () => {
    const userId = userData?.user?.id;
    if (!userId) return; // Si no hay ID del usuario, no hacemos nada.

    try {
      // Llamar a la función `updateUser` para actualizar los datos en el backend
      const updatedUser = await updateUser(userId, {
        name: userName,
        email: userEmail,
        address: userAddress,
        phone: userPhone,
      });

      // Después de actualizar los datos en el backend, podemos actualizar el estado global (contexto)
      setUserData({
        token: userData.token, // Mantener el token
        user: updatedUser, // Actualizar los datos del usuario en el contexto
      });

      setIsEditing(false); // Salir del modo de edición
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
    }
  };

  // Renderizar el formulario
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
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">Card registered</label>
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="**** **** **** 1234"
          disabled
        />
      </div>
      <div className="text-sm text-gray-600">
        You are subscribed at{" "}
        <span className="text-blue-500 font-semibold">CyberGamer</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex-1 flex flex-col">
          <label className="text-gray-700">Expiration date</label>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="MM/YY"
            disabled
          />
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
          Cancel subscription
        </button>
      </div>
      <div className="text-sm text-gray-600">
        Don&apos;t remember your password?{" "}
        <Link href="/login" className="text-blue-500">
          Change your password
        </Link>
      </div>
      <div className="flex justify-center">
        {isEditing ? (
          <button
            type="button"
            onClick={handleSave}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold mt-4"
          >
            Save Information
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)} // Activar el modo de edición
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
