import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    routes: {
        login: '/auth/login',
        logout: '/auth/logout',
        callback: '/auth/callback'
    }
}