"use client"
import { useState } from "react";
import { deleteUser } from "@/helpers/auth.helper";

const DeleteUser = () => {
  const [userId, setUserId] = useState("");

  const handleDelete = async () => {
    try {
      if (!userId) {
        alert("Por favor, ingrese un ID de usuario.");
        return;
      }
      await deleteUser(userId);
      alert(`Usuario con ID ${userId} eliminado exitosamente.`);
      setUserId(""); // Limpiar el campo después de la eliminación
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("Hubo un problema al eliminar el usuario.");
    }
  };

  return (
    <div>
      <h2>Eliminar Usuario</h2>
      <input
        type="text"
        placeholder="Ingrese el ID de usuario"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleDelete}>Eliminar Usuario</button>
    </div>
  );
};

export default DeleteUser;
