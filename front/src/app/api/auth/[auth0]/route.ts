
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
