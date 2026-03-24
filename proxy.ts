import { NextRequest, NextResponse } from "next/server";
import { dcrypt } from "./utility/getSession";
import { JWTPayload } from "jose";

interface SessionProps extends JWTPayload {
  role?: string;
} 

// export async function proxy (request: NextRequest) {
//     const token = request.cookies.get('session_token')?.value
//     if(!token) return NextResponse.redirect(new URL('/practice/login',request.url))
//     try {
//       const payload = await dcrypt(token)
//       // If dcrypt returns null (invalid token), payload will be null
//       if (!payload) {
//         return NextResponse.redirect(new URL('/practice/login', request.url));
//       }
//             const {role} = payload as SessionProps
      
//       if(role !== 'admin' && role!=='user') {
//         return NextResponse.redirect(new URL('/practice/login',request.url))
//       }
//       return NextResponse.next()
//     } catch (error) {
//       return NextResponse.redirect(new URL('/practice/login', request.url));
//     }
// }

// export const config = {
//   matcher: "/practice/resource/:path*"
// }


export async function proxy(request:NextRequest) {
  const {pathname} = request.nextUrl;
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if(isMaintenanceMode && !pathname.startsWith('/_next') && !pathname.includes('/api/')) {
    return new NextResponse(`
      <html>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column;">
          <h1>🛠️ Site Under Maintenance</h1>
          <p>We are currently updating the Todo App. Please come back soon!</p>
          <p><small>Expected back in: 1 hour</small></p>
        </body>
      </html>  
    `, { 
        status: 503, 
        headers: { 
          'Retry-After': '3600', 
          'Content-Type': 'text/html' 
        } 
      }
    )
  }

  // 2. SPECIFIC ROUTE PROTECTION (Your existing Logic)
  // Check if the current path matches your protected resource path
  if (pathname.startsWith('/practice/resource')) {
    const token = request.cookies.get('session_token')?.value;
    
    if (!token) return NextResponse.redirect(new URL('/practice/login', request.url));

    try {
      const payload = await dcrypt(token);
      if (!payload) {
        return NextResponse.redirect(new URL('/practice/login', request.url));
      }

      const { role } = payload as SessionProps;
      if (role !== 'admin' && role !== 'user') {
        return NextResponse.redirect(new URL('/practice/login', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/practice/login', request.url));
    }
  }

  return NextResponse.next();
}

// 3. UPDATED MATCHER
// We remove the specific path from the matcher so the middleware runs 
// on more routes, but we exclude internal Next.js files.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

