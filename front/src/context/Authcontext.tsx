"use client"
//import IAuth0 from '@/interfaces/IAuth0';
//contexto de autenticacion
import { userSession } from '@/interfaces/ISession'
import { useEffect, useState, createContext, useContext } from 'react'

export interface AuthContextProps {
  userData: userSession | null;
  setUserData: (userData: userSession | null) => void;
  //  auth0UserData: IAuth0| null;
  // setAuth0UserData: (userData: { name: string; email: string }) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => { },
  //auth0UserData: null,
  //  setAuth0UserData: () => {},
})

//pasa el context a sus hijos (AuthProvide en Layout)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<userSession | null>(null)
  // const [auth0UserData, setAuth0UserData] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserData = localStorage.getItem("Token")
      if(storedUserData){
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    }
  },[])

  useEffect(()=>{
    if(userData) {
      localStorage.setItem("Token",JSON.stringify({token: userData.token , user:userData.user}));
    } else {
      localStorage.removeItem("Token");
    }
  },[userData])

  return (
    <AuthContext.Provider value={{ setUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


