
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
        isSuscription?:boolean
    }
}


export interface IUserInformation { 
    id: string,
    name:string,
    email:string,
    address:string,
    phone:number,
    isSuscription:boolean,
    admin:string
}