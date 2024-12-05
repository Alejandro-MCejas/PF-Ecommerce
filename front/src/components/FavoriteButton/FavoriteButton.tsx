"use client";

import { useAuth } from "@/context/Authcontext";
import { addFavorite, eliminateFavorite, getFavorites } from "@/helpers/userHelper";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FavoriteButton = ({ userId, productId }: { userId: string; productId: string }) => {
  const [favorite, setFavorite] = useState<boolean>(false); // Estado de favorito
  const {userData} = useAuth()
  const router = useRouter()
  // Sincronizar el estado `favorite` con los favoritos reales del usuario
  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        const favoritesProducts = await getFavorites(userId); // Obtener favoritos del usuario
        const foundProduct = favoritesProducts?.find((p) => p.id === productId);
        setFavorite(!!foundProduct); // Establecer si el producto es favorito o no
      }
    };

    fetchFavorites();
  }, [userId, productId]); // Dependencias: se ejecuta si `userId` o `productId` cambian

  // Manejar el cambio de favorito
  const handleChangeFavourite = async () => {
    if (userId && userData) {
      if (favorite) {
        // Producto ya es favorito, preguntar si eliminar
        const result = await Swal.fire({
          title: "Are you sure you want to eliminate this product from your favorites?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        });

        if (result.isConfirmed) {
          await eliminateFavorite(userId, productId , userData.token); // Eliminar producto de favoritos
          Swal.fire({
            title: "Removed!",
            text: "The product has been removed from your favorites.",
            icon: "success",
          });
          setFavorite(false); // Actualizar estado
        }
      } else {
        // Producto no es favorito, preguntar si agregar
        const result = await Swal.fire({
          title: "Are you sure you want to add this product to your favorites?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add it!",
        });

        if (result.isConfirmed) {
          await addFavorite(userId, productId , userData?.token); // Agregar producto a favoritos
          Swal.fire({
            title: "Added!",
            text: "The product has been added to your favorites.",
            icon: "success",
          });
          setFavorite(true); // Actualizar estado
        }
      }
    }else{
      router.push("/login")
    }
  };

  return (
    <button onClick={handleChangeFavourite}>
      {favorite ? (
        <FontAwesomeIcon icon={faStar} className="size-10" style={{color: "#FFD43B",}} />
      ) : (
        <FontAwesomeIcon icon={faStar}  className="size-10"  />
      )}
    </button>
  );
};

export default FavoriteButton;
