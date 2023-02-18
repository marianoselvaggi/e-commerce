import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';

export async function middleware(req: NextRequest) {
    // const urlObj = new URL(req.url)
    // const redirectUrl = urlObj.toString().replace(urlObj.protocol + '//' + urlObj.host,'')
    
    // const token = req.cookies.get('token');
    // try {
    //     await jose.jwtVerify(token!, new TextEncoder().encode(process.env.JWT_SECRET_SEED || ''));
    //     return NextResponse.next();
    // } catch {
    //     console.log(redirectUrl)
    //     return NextResponse.redirect(redirectUrl)
    // }
}

export const config = {
    matcher: '/checkout/:path*',
}