"use client"

import { useAuth } from "@/context/Authcontext";
import { getFavorites } from "@/helpers/userHelper";
import { IProduct } from "@/interfaces/IProduct";
import Link from "next/link";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [favoriteGames, setFavoriteGames] = useState<IProduct[]>([])
  const { userData } = useAuth()
  useEffect(() => {
    const fetchingFavorites = async () => {
      try {
        if (userData) {
          const favoriteProducts = await getFavorites(userData.user.id , userData.token);
          console.log("Favorite products:", favoriteProducts); // Verifica los datos aquí
          if (Array.isArray(favoriteProducts)) {
            setFavoriteGames(favoriteProducts);
          } else {
            setFavoriteGames([]);
          }
        }
      } catch (error) {
        console.log(error);
        setFavoriteGames([]);
      }
    };

    fetchingFavorites();
  }, [userData]);



  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Your Favorite Games</h2>
      <div className="flex flex-wrap gap-5">
        {favoriteGames.map(game => (
          <Link href={`/products/${game.id}`} key={game.id}>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between">
              <div className="w-full flex justify-center items-center ">
                <h3 className="text-lg font-bold text-gray-700">{game.name}</h3>
              </div>
              <div className="">
                <img src={game.image[0]} alt="logoJuego" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
