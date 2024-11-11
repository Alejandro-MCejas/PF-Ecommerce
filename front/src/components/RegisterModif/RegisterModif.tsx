"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { register } from "@/helpers/auth.helper";
import { IRegisterProps } from "@/interfaces/IRegisterProp";
import { IRegisterError } from "@/interfaces/IRegisterError";
import validateRegisterForm from "@/helpers/validateRegister";
import Link from "next/link";
import { AuthContext } from "@/context/Authcontext";

const Register = () => {
  const router = useRouter();
  const { userData } = useContext(AuthContext);

  const initialState = {
    name: userData?.userData.name || "",
    email: userData?.userData.email || "",
    password: "",
    passwordConfirm: "",
    address: userData?.userData.address || "",
    phone: userData?.userData.phone || "",
  };

  const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
  const [errors, setErrors] = useState<IRegisterError>(initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setIsFormValid(
      dataUser.name.trim() !== '' &&
      dataUser.email.trim() !== '' &&
      dataUser.address.trim() !== '' &&
      dataUser.phone?.trim() !== ''
    );
  }, [dataUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser({
      ...dataUser,
      [name]: value,
    });

    setErrors({ ...errors, [name]: "" });

    if (name === "passwordConfirm" && value !== dataUser.password) {
      setErrors({ ...errors, passwordConfirm: "Las contraseñas no coinciden" });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target as { name: keyof IRegisterProps };
    setTouched({ ...touched, [name]: true });
    const fieldErrors = validateRegisterForm(dataUser);
    setErrors({ ...errors, [name]: fieldErrors[name] });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(dataUser); // Cambia a la función de modificar usuario si es necesario
    Swal.fire({
      title: "User Updated",
      text: "User information has been updated successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
    router.push("/profile");
  };

  return (
    <div className="flex flex-col items-center bg-[#232323] min-h-screen">
      <form onSubmit={handleSubmit}>
        {/* Contenido del formulario con placeholders inicializados */}
        <div className="relative w-[350px] mb-4">
          <input
            id="name"
            name="name"
            type="text"
            value={dataUser.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={userData?.userData.name || "Username"}
            className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
          />
          {touched.name && errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>
        {/* Repite el código para otros campos, configurando `placeholder` según `userData` */}
        <button type="submit" disabled={!isFormValid} className="...">
          Update User
        </button>
      </form>
    </div>
  );
};

export default Register;
