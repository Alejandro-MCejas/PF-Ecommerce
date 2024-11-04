
export interface userSession {
    token: string,
    userData:{
        id: string;
        address?: string;
        email: string;
        user?: string;
              
    }
}