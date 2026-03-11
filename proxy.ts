import { NextRequest, NextResponse } from "next/server";
import { dcrypt } from "./utility/getSession";
import { JWTPayload } from "jose";

interface SessionProps extends JWTPayload {
  role?: string;
} 

export async function proxy (request: NextRequest) {
    const token = request.cookies.get('session_token')?.value
    if(!token) return NextResponse.redirect(new URL('/practice/login',request.url))
    try {
      const payload = await dcrypt(token)
      // If dcrypt returns null (invalid token), payload will be null
      if (!payload) {
        return NextResponse.redirect(new URL('/practice/login', request.url));
      }
            const {role} = payload as SessionProps
      
      if(role !== 'admin' && role!=='user') {
        return NextResponse.redirect(new URL('/practice/login',request.url))
      }
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/practice/login', request.url));
    }
}

export const config = {
  matcher: "/practice/resource/:path*"
}