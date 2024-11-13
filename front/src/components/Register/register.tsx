"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { register } from "@/helpers/auth.helper";
import { IRegisterProps } from "@/interfaces/IRegisterProp";
import { IRegisterError } from "@/interfaces/IRegisterError";
import validateRegisterForm from "@/helpers/validateRegister";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "", 
    address: "",
    phone: "",
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
      dataUser.password?.trim() !== '' &&
      dataUser.confirmPassword.trim() !== '' &&
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

    if (name === "confirmPassword") {
      if (value !== dataUser.password) {
        setErrors({
          ...errors,
          confirmPassword: "Las contraseñas no coinciden"
        });
      } else {
        setErrors({
          ...errors,
         confirmPassword: ""
        });
      }
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
    console.log(dataUser);
    
    await register(dataUser);
    Swal.fire({
      title: "Registration Successful",
      text: "You have registered successfully!",
      icon: "success",
      confirmButtonText: "OK",
    });
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center bg-[#232323] min-h-screen">
      <form onSubmit={handleSubmit}>
        <div
          className="w-[700px] h-[770px] rounded-3xl p-6 flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('https://s3-alpha-sig.figma.com/img/cbb0/cfd6/44adb71e20860f163fae903a53d3dcae?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FA2cr~T-OdINkTrOJiJ8FI2Jlo4w3ms28JCxO5MAyr2I72Pi-t7LLEp0iMRxnvJkFMt3oIVBc6YveMlmomnPYC4Q8DM-HOh-j9~Z7N72QVV8CpfBS-jxWt8fIPPmXcSsbLF3pwtzdeRyYpY-tG9o6LN~LxSt23I7E~SrGLfWpdYT-7xK9mEFK7vHWjVH7B6XD0tePo5I6~BLRGPkn~0qKEkSDj19NZ3tvk5-UrIKH6130rx3IZNtdaigucn~nPF~I3VULiDBCv6~okyL71379eGjvSyBO1HfP69hhqsP7Qoc97hQu4W~UO-eoDp4Hl~MevJN7H3S0lFpTxcUKZYfvw__')",
          }}
        >
          <div className="bg-white rounded-3xl h-[80%] w-[70%] p-8 flex flex-col items-center space-y-4">
            <h1 className="font-inter font-bold text-[48px] leading-[58px] tracking-[0.1em]">Sign up</h1>
            <p className="text-gray-700">Sign up to continue</p>

            {/* Email Input */}
            <div className="relative w-[350px] mb-4">
              <input
                id="email"
                name="email"
                type="email"
                value={dataUser.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {touched.email && errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            {/* Password Input */}
            <div className="relative w-[350px] mb-4">
              <input
                id="password"
                name="password"
                type="password"
                value={dataUser.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {touched.password && errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>

            {/* Password Confirm Input */}
            <div className="relative w-[350px] mb-4">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={dataUser.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Repeat password"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {touched.confirmPassword && errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>

            {/* Username Input */}
            <div className="relative w-[350px] mb-4">
              <input
                id="name"
                name="name"
                type="text"
                value={dataUser.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Username"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {touched.name && errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            {/* Address Input */}
            <div className="relative w-[350px] mb-4">
              <input
                id="address"
                name="address"
                type="text"
                value={dataUser.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Address"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {touched.address && errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>
              
            {/* Phone Input */}
            <div className="relative w-[350px] mb-4">
              <input
                id="phone"
                name="phone"
                type="text"
                value={dataUser.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Phone"
                className="w-full h-[40px] p-2 border-b-2 border-[#00000080] bg-transparent text-black placeholder-gray-500"
              />
              {touched.phone && errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>

            {/* Register Button */}
            <button className="w-[250px] h-[50px] bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50" type="submit" disabled={!isFormValid}>
              Register
            </button>

            {/* Login Link */}
            <p className="font-inter italic text-[24px] leading-[29.05px] text-center text-black mt-4">
              Already have an account?{' '}
              <Link href="/login">
                <span className="font-bold text-blue-500 cursor-pointer">Log in</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
