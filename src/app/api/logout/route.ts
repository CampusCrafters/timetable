import { NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest){
    const response = NextResponse.redirect(new URL('/', request.url),302);
    response.cookies.delete('token')
    return response
}