export interface IRegisterProps {

    password: string;
    passwordConfirm: string;
    email: string;
    name: string;
    address: string;
    phone: string;
    [key: string]: string; 
}
export type ILoginProps = Pick<IRegisterProps, "name" | "password">;