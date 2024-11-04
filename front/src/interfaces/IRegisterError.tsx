export interface IRegisterError {
    [key: string]: string | undefined;
    id?:string;
    password?: string;
    email?: string;
    username?: string;
    address?: string;
}