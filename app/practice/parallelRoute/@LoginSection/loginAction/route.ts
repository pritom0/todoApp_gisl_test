import { encrypt } from "@/utility/getSession";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  try {
    const body = await request.json();
    const {role} = body;
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    // const session:string = await encrypt({role, expires});
    const session:string = await encrypt({role});
    (await cookies()).set("session_token", session, {
    expires,
    httpOnly: true, // Prevents JavaScript from reading the cookie (Secure!)
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
  return NextResponse.json({status:200})
  } catch (error) {
    return NextResponse.json({status:500, message: "login action error"})    
  }

}