"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ILoginError, ILoginProps } from "./TypesLogin";
import { login } from "@/helpers/auth.helper";
import { validateLoginform } from "@/helpers/validateLogin";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const initialState = {
    name: "",
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

  const handleSubmit = async (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(""); // Limpiar error general antes de intentar el login

    try {
      const response = await login(dataUser);
      const { token, user } = response;
      const clearUser = {
        id: user.id,
        name: user.name,
        rol: user.role, 
      };

      localStorage.setItem("userSession", JSON.stringify({ token, userData: clearUser }));
      alert("You have logged in successfully");
      router.push("/");
    } catch (error: any) {
      setGeneralError(error.message);
    }
  };

  useEffect(() => {
    const errors = validateLoginform(dataUser);
    setErrors(errors);
  }, [dataUser]);

  return (
    <div className="flex flex-col items-center bg-[#232323] min-h-screen">
      <form onSubmit={handleSubmit}>
        <div
          className="w-[700px] h-[770px] rounded-3xl p-6 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://s3-alpha-sig.figma.com/img/cbb0/cfd6/44adb71e20860f163fae903a53d3dcae?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FA2cr~T-OdINkTrOJiJ8FI2Jlo4w3ms28JCxO5MAyr2I72Pi-t7LLEp0iMRxnvJkFMt3oIVBc6YveMlmomnPYC4Q8DM-HOh-j9~Z7N72QVV8CpfBS-jxWt8fIPPmXcSsbLF3pwtzdeRyYpY-tG9o6LN~LxSt23I7E~SrGLfWpdYT-7xK9mEFK7vHWjVH7B6XD0tePo5I6~BLRGPkn~0qKEkSDj19NZ3tvk5-UrIKH6130rx3IZNtdaigucn~nPF~I3VULiDBCv6~okyL71379eGjvSyBO1HfP69hhqsP7Qoc97hQu4W~UO-eoDp4Hl~MevJN7H3S0lFpTxcUKZYfvw__')",
          }}
        >
          <div className="bg-white rounded-3xl h-[80%] w-[70%] p-8 flex flex-col items-center space-y-4">
            <h1 className="font-inter font-bold text-[48px] leading-[58px] tracking-[0.1em]">Login</h1>
            <p className="text-gray-700">Log in and dive into CyberGames</p>

            {/* Mostrar error general si existe */}
            {generalError && <span className="text-red-500">{generalError}</span>}

            {/* Input para Nombre de Usuario */}
            <div className="relative w-[350px] mb-4">
              <input
                id="name"
                name="name"
                type="text"
                value={dataUser.name}
                onChange={handleChange}
                placeholder="name"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>

            {/* Input para Contraseña */}
            <div className="relative w-[350px] mb-4">
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
              className="w-[250px] h-[50px] bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Login
            </button>

            {/* Login adicional con ícono */}
            <button
              className="w-[250px] h-[50px] bg-[#FF973D] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
              type="button"
            >
              Login
              <Image
                src="https://s3-alpha-sig.figma.com/img/c1f7/af45/b7120995e091ef867eb852154830c210?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NremoJpuX~9zwsTnDpCpiYhwWdcWq4CROO74NzZPEySh1R1UEdwUWvHa-6I-hfCvogaB2r16-W~spxmNqZK82WCIQBbl3norXHc~W~xKF3wPmn1OtnzLtt4JjJThTqYozZNALJHmSYZZv38KdMkMarXw5ligCrW295JCw6w59l0zu~fmTUtfRnEJhGrtebdJgfo-uY-nJ-LAxHQj-TGrxzh6IGJvhiBdIkVjdH2CXe4xQAg3uJAwrfaFvccFxpR9~Vmxz4GquN2vxChTc8Bi-EZKSbZYZSd7jNDk3LTWGVfii-tUn~nfxlltmKvIyOmItpzE0lNh3oYOCwsjcFFeGA__"
                alt="Login Icon"
                className="w-[20px] h-[20px] ml-2"
              />
            </button>

            {/* Mensaje de inicio de sesión */}
            <p className="font-inter italic text-[24px] leading-[29.05px] text-center text-black mt-4">
              Don't have an account yet?{" "}
              <Link href="/register">
                <span className="font-bold text-blue-500 cursor-pointer">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
