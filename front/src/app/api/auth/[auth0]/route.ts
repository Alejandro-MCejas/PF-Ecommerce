// import { NextRequest, NextResponse } from 'next/server';
// import { handleAuth } from '@auth0/nextjs-auth0';

// export async function GET(
//   request: NextRequest,
//   context: { params: { auth0: string } }
// ): Promise<NextResponse> {
//   const { params } = context;
//   const auth0Param = params?.auth0;

//   if (!auth0Param) {
//     return NextResponse.json(
//       { error: 'Parámetro auth0 no proporcionado' },
//       { status: 400 }
//     );
//   }

//   // Llama a handleAuth con el parámetro correspondiente
//   return handleAuth()(request);
// }


// Importar el tipo RouteContext de Next.js
// import { NextRequest, NextResponse } from 'next/server';
// import { handleAuth } from '@auth0/nextjs-auth0';

// export async function GET(
//   request: NextRequest,
//   context: { params: Promise<{ auth0: string }> } // Ajuste aquí
// ): Promise<NextResponse> {
//   const { params } = context;
//   const { auth0 } = await params; // Desestructuración después de resolver la Promise

//   if (!auth0) {
//     return NextResponse.json(
//       { error: "Parámetro 'auth0' no proporcionado" },
//       { status: 400 }
//     );
//   }

//   try {
//     // Llama a handleAuth con el parámetro correspondiente
//     return handleAuth()(request);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Error al manejar la solicitud de Auth0', detalles: String(error) },
//       { status: 500 }
//     );
//   }
// }




// import { handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { auth0: string } }
// ): Promise<NextResponse> {
//   const { auth0 } = params;

//   if (!auth0) {
//     return NextResponse.json(
//       { error: 'Parámetro auth0 no proporcionado' },
//       { status: 400 }
//     );
//   }

//   try {
//     let response: Response | null = null;

//     switch (auth0) {
//       case 'login':
//         response = await handleLogin(req, { params });
//         break;
//       case 'logout':
//         response = await handleLogout(req, { params });
//         break;
//       case 'callback':
//         response = await handleCallback(req, { params });
//         break;
//       case 'me':
//         response = await handleProfile(req, { params });
//         break;
//       default:
//         return NextResponse.json(
//           { error: `Ruta no reconocida: ${auth0}` },
//           { status: 404 }
//         );
//     }

//     // Convertimos Response a NextResponse
//     const headers = new Headers(response.headers);
//     const body = await response.text(); // Convertimos el cuerpo a texto

//     return new NextResponse(body, {
//       status: response.status,
//       headers,
//     });
//   } catch (error) {
//     console.error(`Error al manejar la ruta ${auth0}:`, error);
//     return NextResponse.json(
//       { error: 'Error interno al manejar la solicitud', detalles: String(error) },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { handleAuth } from "@auth0/nextjs-auth0";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ auth0: string }> } // Ajuste aquí
): Promise<NextResponse> {
  try {
    // Validación inicial para context y params
    if (!context || typeof context.params === "undefined" || context.params === null) {
      return NextResponse.json(
        { error: "El contexto o los parámetros no están disponibles" },
        { status: 400 }
      );
    }

    const params = await context.params; // Resolver Promise
    const { auth0 } = params;

    if (!auth0) {
      return NextResponse.json(
        { error: "Parámetro 'auth0' no proporcionado" },
        { status: 400 }
      );
    }

    // Llama a handleAuth con el request
    return await handleAuth()(request);
  } catch (error) {
    console.error("Error en el manejo de la solicitud:", error);
    return NextResponse.json(
      { error: "Error en el manejo de la solicitud de Auth0", detalles: String(error) },
      { status: 500 }
    );
  }
}

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { auth0: string[] } }
// ) {
//   try {
//     // Verifica que el parámetro 'auth0' esté presente
//     if (!params.auth0 || params.auth0.length === 0) {
//       return new Response(
//         JSON.stringify({ error: "Parámetro 'auth0' no proporcionado" }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Llama a handleAuth para manejar la autenticación
//     const authHandler = handleAuth();
//     return authHandler(request);
//   } catch (error) {
//     console.error('Error al manejar la solicitud de Auth0:', error);
//     return new Response(
//       JSON.stringify({
//         error: 'Error al manejar la solicitud de Auth0',
//         detalles: String(error),
//       }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }








