
export interface userSession {
    token: string,
    user:{
        id: string;
        name?: string
        address?: string;
        email: string;
        user?: string;
        phone?: string
        admin?:string
    }
}