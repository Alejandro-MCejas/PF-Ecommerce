"use client";

import React, { useEffect, useState } from "react";
import { IProduct, EditGameModalProps } from "@/interfaces/IProduct";
import { HomeCardGame } from "../HomeCardGame/HomeCardGame";
import { useAuth } from "@/context/Authcontext";
import { changeProductsHome, getProductsHome } from "@/helpers/productHelper";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const EditGameModal: React.FC<EditGameModalProps> = ({ games }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGames, setSelectedGames] = useState<IProduct[]>([]); // Para los 4 juegos seleccionados
  const [tempSelectedGames, setTempSelectedGames] = useState<IProduct[]>([]); // Temporal en el modal
  const [productInCard, setProductInCard] = useState<IProduct[]>([]); // Los juegos traídos por el backend
  const { userData } = useAuth();
  const router = useRouter()

  // Obtener los juegos del backend al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsHome();
      setProductInCard(products); // Mantener los productos que vienen del backend
    };

    fetchProducts();
  }, []);

  const openModal = () => {
    setTempSelectedGames([]); // Inicializar el estado temporal vacío
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleApplyChanges = async () => {
    try {
      if (tempSelectedGames.length !== 4) {
        await Swal.fire({
          title: "Invalid Selection",
          text: "You must select exactly 4 games.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
  
      if (userData?.token) {
        const confirmResult = await Swal.fire({
          title: "Are you sure?",
          text: "You are about to update the home games.",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, apply changes!",
        });
  
        if (confirmResult.isConfirmed) {
          // Combinar los IDs de los productos traídos por el backend y los seleccionados
          const idsArray = [
            ...productInCard.map((game) => ({ id: game.id })), // IDs del backend
            ...tempSelectedGames.map((game) => ({ id: game.id })), // IDs seleccionados
          ];
  
          const changeProducts = await changeProductsHome(idsArray, userData.token);
          console.log("Productos cambiados con éxito:", changeProducts);
  
          await Swal.fire({
            title: "Changes Applied!",
            text: "The home games have been updated successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          
          setSelectedGames(tempSelectedGames); // Actualizar los juegos seleccionados
          setIsOpen(false);
          window.location.reload()
          return changeProducts;
        }
      }
    } catch (error) {
      console.error("El error fue:", error);
      await Swal.fire({
        title: "Error",
        text: "Something went wrong while applying changes.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCheckboxChange = (game: IProduct) => {
    if (tempSelectedGames.some((selectedGame) => selectedGame.id === game.id)) {
      // Quitar si ya está seleccionado
      setTempSelectedGames(
        tempSelectedGames.filter((selectedGame) => selectedGame.id !== game.id)
      );
    } else if (tempSelectedGames.length < 4) {
      // Agregar si no supera el límite de 4
      setTempSelectedGames([...tempSelectedGames, game]);
    } else {
      alert("You can only select 4 games.");
    }
  };

  if (userData?.user.admin !== "admin") {
    return (
      <div className="w-[800px] md:w-[1500px] flex justify-evenly items-center">
        <div className="w-1/2 md:w-full flex flex-wrap md:flex-nowrap justify-evenly items-center">
          {productInCard.map((game, index) => (
            <div className="w-1/2 flex justify-center p-3 md:p-0" key={index}>
              <HomeCardGame
                imagenUrl={
                  game.image &&
                    Array.isArray(game.image) &&
                    game.image.length > 0
                    ? game.image[0]
                    : undefined
                }
                id={game.id}
                title={game.name}
                price={game.price}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="top-0">
      <div className="flex flex-col w-[1500px] justify-center items-center">
        <div className="w-1/4 md:w-full flex flex-wrap md:flex-nowrap justify-evenly items-center">
          {productInCard.map((game, index) => (
            <div className="w-1/2 flex justify-center p-3 md:p-0" key={index}>
              <HomeCardGame
                key={index}
                id={game.id}
                imagenUrl={game.image[0]}
                title={game.name}
                price={game.price}
              />
            </div>
          ))}
        </div>
        <div className="md:mt-10">
          <button
            className="bg-violet-600 text-white text-[34px] w-[300px] h-[50px] tracking-widest font-bold rounded-md hover:bg-violet-400 transition"
            onClick={openModal}
          >
            Edit Game
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-6">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-[1000px] h-auto md:h-[700px]">
            <h2 className="text-2xl mb-4">Choose 4 games for change</h2>
            <div className="w-full">
              <div className="overflow-y-auto max-h-[400px]">
                {games.map((game) => (
                  <label
                    key={game.id}
                    className="flex items-center justify-between p-4 bg-gray-100 mb-2 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tempSelectedGames.some(
                          (selectedGame) => selectedGame.id === game.id
                        )}
                        onChange={() => handleCheckboxChange(game)}
                        className="mr-4"
                      />
                      <span className="font-semibold">{game.name}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-5 flex flex-col justify-evenly items-center gap-10">
                <button
                  className="w-[200px] bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
                  onClick={handleApplyChanges}
                >
                  Apply changes
                </button>
                <button
                  className="w-[200px] bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditGameModal;
