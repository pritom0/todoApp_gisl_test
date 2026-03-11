import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = (await cookies())
  const sessionToken = cookieStore.get('session_token')?.value || ''
  try {
    const payload = dcrypt(sessionToken);
    return payload;    
  } catch (error) {
    return null;
  }
}

// cookie await get session, 
// decrypt jwt signed session token = payload, return payload

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET)
export async function dcrypt(token: string) {
  // unsign jwt using key, 
  
  try {
    const {payload} = await jwtVerify(token, SECRET_KEY, {algorithms: ["HS256"]});
    return payload
  } catch (error) {
    return null;
  }

}

type EncryptProp = {
  role: string;
  // expires: typeof Date
}

import { SignJWT } from "jose";

export async function encrypt({role}: EncryptProp) {
  return await new SignJWT({role})
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Token expires in 7 days
    .sign(SECRET_KEY);
  
}

