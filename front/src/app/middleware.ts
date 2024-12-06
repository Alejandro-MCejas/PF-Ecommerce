import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    console.log(pathname)
    debugger
    // Verificar si se está accediendo a una página protegida sin un token
    if ((pathname === '/dashboard') && !request.cookies.get('token')?.value) {
        const loginUrl = new URL('/login', origin);
        return NextResponse.redirect(loginUrl);
    }

    if ((pathname === '/cybergamer') && !request.cookies.get('token')?.value) {
        const loginUrl = new URL('/login', origin);
        return NextResponse.redirect(loginUrl);
    }
    
    // Permitir el acceso en cualquier otro caso
    return NextResponse.next();
}