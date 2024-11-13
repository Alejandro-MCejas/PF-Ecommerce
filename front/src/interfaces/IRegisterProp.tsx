export interface IRegisterProps {

    password: string;
    confirmPassword: string;
    email: string;
    name: string;
    address: string;
    phone: string;
    [key: string]: string; 
}
export type ILoginProps = Pick<IRegisterProps, "email" | "password">;