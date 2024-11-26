
export interface userSession {
    name: string;
    picture: string;
    token: string,
    user:{
        id: string;
        name?: string
        address?: string;
        email: string;
        user?: string;
        phone?: string
        admin?:string
        isSuscription:boolean

    }
}