// // app/api/auth/[auth0]/route.js
// import { handleAuth } from '@auth0/nextjs-auth0';

// export const GET = handleAuth();










import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@auth0/nextjs-auth0';

export async function GET(
  request: NextRequest,
  context: { params: { auth0: string } }
): Promise<NextResponse> {
  const { params } = context;
  const auth0Param = params?.auth0;

  if (!auth0Param) {
    return NextResponse.json(
      { error: 'Parámetro auth0 no proporcionado' },
      { status: 400 }
    );
  }

  // Llama a handleAuth con el parámetro correspondiente
  return handleAuth()(request);
}




