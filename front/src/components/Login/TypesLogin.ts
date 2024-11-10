import { IRegisterProps } from "@/interfaces/IRegisterProp";

export interface ILoginProps{
name: string;
password: string

}
export interface ILoginError {
    name?: string;
    password?: string
}

export type TRegisterError = Partial<IRegisterProps>