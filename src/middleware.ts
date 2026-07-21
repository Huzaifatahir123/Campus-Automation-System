import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
export async function middleware(req: NextRequest){
    const pathName = req.nextUrl.pathname;
    const token= req.cookies.get("token")?.value;
    if(!token){
        return NextResponse.redirect(new URL("/login",req.url))
    }
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role;
    console.log(userRole);
    if (pathName.startsWith('/admin') && userRole !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathName.startsWith('/teacher') && userRole !== 'Teacher') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathName.startsWith('/student') && userRole !== 'Student') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathName.startsWith('/parent') && userRole !== 'Parent') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    return NextResponse.next();
    } catch (error) {
        console.error(error);
        return NextResponse.redirect(new URL("/login", req.url));
}
    

}
export const config = {
  matcher: [
    '/admin/:path*',
    '/teacher/:path*',
    '/student/:path*',
    '/parent/:path*',
  ],
};