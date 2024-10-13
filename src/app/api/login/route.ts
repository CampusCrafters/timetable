import { NextResponse,NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest){

    const username = await request.json()
    const jsonString = JSON.stringify(username);
    const email = jsonString.split(':')[1].split('}')[0].trim().replace(/[""]/g, '');

    const JWT_SECRET = process.env.JWT_SECRET || ''

    const token = jwt.sign({username:username}, JWT_SECRET)
    

    const regex = /^[a-zA-Z]+\d{2}[a-z]{3}\d+@iiitkottayam\.ac\.in$/;

    if (!email.match(regex)) {
        const response = NextResponse.json({error: "Invalid email"});
        return response
    }

    const response = NextResponse.redirect(new URL('/dashboard', request.url),302);
    response.cookies.set("token", token, {  
        sameSite: "lax", 
        path: '/',  
    });
    
    return response
}