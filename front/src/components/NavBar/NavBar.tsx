"use client";

import Link from "next/link";
import Search from "../Search";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/Authcontext";
import { useEffect, useState } from "react";
import ProfileClient from "../useUse/useClient";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import logoApp from "../../../public/logoApp.png";
import Image from "next/image";

const NavBar = () => {
  const { cartCount } = useCart();
  const { userData , setUserData} = useAuth(); 
  const router = useRouter()
  const role = userData?.user?.admin;
  const [clientRendered, setClientRendered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClose = () => {
    localStorage.clear();
    setUserData(null);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: { container: "mt-12" },
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Thank you for visiting our website, come back soon",
    });
    router.push("/");
  };

  useEffect(() => {
    setClientRendered(true);
  }, []);

  if (!clientRendered) {
    return null;
  }

  return (
    <div className="w-full bg-[#232323] p-4 md:p-8 z-50">
      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-y-4 md:gap-y-0">
        <Link href="/" className="flex items-center justify-evenly md:justify-start">
          <Image
            src={logoApp}
            alt="Logo"
            className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
          />
          <span className="text-[24px] md:text-[40px] font-Tilt-neon text-[#A065FF] ml-2 md:ml-4">
            Cybergames
          </span>
        </Link>

        <div className="flex justify-center md:justify-center w-full">
          <Search />
        </div>

        <div className="flex justify-center md:justify-end relative">
          <ProfileClient />

          {role === undefined ? (
            <div className="bg-[#A065FF] text-white rounded-xl px-4 py-2 text-center">
              <span className="text-[16px] md:text-[25px] font-Tilt-neon">
                <Link href="/login">Log In</Link> / <Link href="/register">Register</Link>
              </span>
            </div>
          ) : (
            <div className="hidden md:block">
              <div
                className="bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center cursor-pointer relative"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <FontAwesomeIcon icon={faUser} className="text-[50px]" />
                {menuOpen && (
                  <div className="absolute top-[110%] right-0 bg-white shadow-lg rounded-lg p-4 text-[#232323] w-[150px]">
                    <Link href="/dashboard" className="block text-sm hover:text-[#A065FF]">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleClose}
                      className="block text-sm mt-2 text-left hover:text-[#A065FF] w-full"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 w-full max-w-[1500px] mx-auto h-[3px] bg-[#A065FF] rounded-3xl" />

      <div className="w-full max-w-[1500px] mx-auto flex flex-wrap justify-between mt-4 px-4 md:px-8">
        <Link href="/home" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
          Home
        </Link>
        <Link href="/products" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
          Games
        </Link>
        <Link href="/subscription" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
          Subscription
        </Link>

        {role === "user" && (
          <Link href="/cart" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
            <FontAwesomeIcon icon={faCartShopping} bounce={cartCount > 0} />
            {cartCount > 0 && <span className="ml-2 text-sm font-semibold text-white">{cartCount}</span>}
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
