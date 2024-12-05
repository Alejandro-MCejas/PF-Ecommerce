"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ILoginError, ILoginProps } from "./TypesLogin";
import { login } from "@/helpers/auth.helper";
import Swal from "sweetalert2";
import { useAuth } from "@/context/Authcontext";
import ChangePassword from "../ChangePassword/ChangePassword";
import { userSession } from "@/interfaces/ISession";

const AUTH0_BASE_URL: string | undefined = process.env.NEXT_PUBLIC_AUTH0_BASE_URL;

// console.log(AUTH0_BASE_URL)

const Login = () => {
  const { setUserData } = useAuth();
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
  const [errors, setErrors] = useState<ILoginError>({});
  const [generalError, setGeneralError] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(""); // Limpiar error general antes de intentar el login

    try {
      const response = await login(dataUser);
      const { token, user } = response;

      const userSessionData: userSession = {
        token,
        user: {
          ...user,
          name: user.name || "Default Name",
          picture: user.picture || "default-picture-url.jpg",
        },
        name: "",
        picture: ""
      };

      setUserData(userSessionData);

      Swal.fire({
        title: "Login Successful",
        text: "You have logged in successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });


      // Redirige según el rol del usuario
      if (user.admin === "admin") {
        router.push("/home");
      } else if (user.admin === "user") {
        router.push("/home");
      } else {
        router.push("/"); // Redirige a la página principal si no tiene un rol específico
      }
    } catch (error: any) {
      setGeneralError(error.message);
    }

  };


  const handleLoginGoogle = async () => {
    window.location.href = `${AUTH0_BASE_URL}/auth/login`;
  };

  return (
    <div className="flex flex-col items-center bg-[#232323] md:min-h-screen">
      <form onSubmit={handleSubmit}>
        <div
          className="w-[700px] h-[770px] rounded-3xl p-6 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://s3-alpha-sig.figma.com/img/cbb0/cfd6/44adb71e20860f163fae903a53d3dcae?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FA2cr~T-OdINkTrOJiJ8FI2Jlo4w3ms28JCxO5MAyr2I72Pi-t7LLEp0iMRxnvJkFMt3oIVBc6YveMlmomnPYC4Q8DM-HOh-j9~Z7N72QVV8CpfBS-jxWt8fIPPmXcSsbLF3pwtzdeRyYpY-tG9o6LN~LxSt23I7E~SrGLfWpdYT-7xK9mEFK7vHWjVH7B6XD0tePo5I6~BLRGPkn~0qKEkSDj19NZ3tvk5-UrIKH6130rx3IZNtdaigucn~nPF~I3VULiDBCv6~okyL71379eGjvSyBO1HfP69hhqsP7Qoc97hQu4W~UO-eoDp4Hl~MevJN7H3S0lFpTxcUKZYfvw__')",
          }}
        >
          <div className="bg-white rounded-3xl w-1/2 h-[80%] md:w-[70%] p-8 flex flex-col items-center space-y-4">
            <h1 className="font-inter font-bold text-[40px] md:text-[48px] leading-[58px] tracking-[0.1em]">
              Login
            </h1>
            <p className="text-gray-700">Log in and dive into CyberGames</p>

            {/* Mostrar error general si existe */}
            {generalError && <span className="text-red-500">{generalError}</span>}

            {/* Input para Email */}
            <div className="relative w-[250px] md:w-[350px] mb-4">
              <input
                id="email"
                name="email"
                type="text"
                value={dataUser.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>

            {/* Input para Contraseña */}
            <div className="relative w-[250px] md:w-[350px] mb-4">
              <input
                id="password"
                name="password"
                type="password"
                value={dataUser.password}
                onChange={handleChange}
                placeholder="*******"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>

            {/* Botón de Inicio de Sesión */}
            <button
              className="w-[250px] h-[50px] bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
              type="submit"
            >
              Login
            </button>

            {/* Login adicional con ícono */}
            <button
              onClick={handleLoginGoogle}
              className="w-[250px] h-[50px] bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              Login with other
            </button>

            {/* Mensaje de registro */}
            <p className="font-inter italic text-[15px] md:text-[24px] leading-[29.05px] text-center text-black mt-4">
              Don&apos;t have an account yet?{" "}
              <Link href="/register">
                <span className="font-bold text-blue-500 cursor-pointer">Sign up</span>
              </Link>
            </p>
            <div className="w-4/5">
              <p className="font-inter italic text-[15px] md:text-[24px] leading-[29.05px] text-gray-600 text-center">Don&apos;t remember your password?{" "}</p>
              <ChangePassword/>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
