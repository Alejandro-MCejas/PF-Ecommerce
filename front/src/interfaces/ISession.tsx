
export interface userSession {
    token: string,
    userData:{
        id: string;
        name?: string
        address?: string;
        email: string;
        user?: string;
        phone?: string
              
    }
}