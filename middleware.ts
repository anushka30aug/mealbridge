import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const tokenFromUrl = req.nextUrl.searchParams.get("token");
  const tokenFromCookies = req.cookies.get("token")?.value;
  const response = NextResponse.next();

  if (tokenFromUrl) {
    // Store the token in cookies
    response.cookies.set("token", tokenFromUrl, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Redirect to clean dashboard URL without the token in the query
    return NextResponse.redirect(new URL("/", req.url));
  }

  const protectedRoutes = ["/meals", "/profile"];
  const publicRoutes = ["/signin"]

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!tokenFromCookies) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    try {
      jwt.verify(tokenFromCookies, process.env.JWT_SECRET as string);
    } catch {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (publicRoutes.includes(req.nextUrl.pathname) && tokenFromCookies) {
    return NextResponse.redirect(new URL("/meals", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/meals", "/profile", "/login"],
};
