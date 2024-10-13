import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || '';

async function verifyToken(token: string) {
  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    return await jwtVerify(token, secretKey);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || '';
  const admin = request.cookies.get("admin")?.value || '';

  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token) {
      const verification = await verifyToken(token);
      if (verification) {
        return NextResponse.redirect(new URL('/dashboard', request.url), 302);
      }
    }
    return NextResponse.next();
  }

  if(request.nextUrl.pathname.startsWith('/admin/login') || request.nextUrl.pathname.startsWith('/admin/register')) {
    if(admin){
      const verification = await verifyToken(admin);
      if (verification) {
        return NextResponse.redirect(new URL('/admin', request.url), 302);
      }
    }
    return NextResponse.next();
  }

  if(request.nextUrl.pathname.startsWith('/admin')) {
    if(!admin){
      return NextResponse.redirect(new URL('/admin/login', request.url), 302);
    }
    if (admin) {
      const verification = await verifyToken(admin);
      if (verification) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/admin/login', request.url), 302);
    }
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url), 302);
    }

    const verification = await verifyToken(token);
    if (verification) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url), 302);
  }
}

export const config = {
  matcher: ['/dashboard', '/login','/admin','/admin/login','/admin/register'],
};
