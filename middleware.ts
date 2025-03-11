import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const tokenFromUrl = req.nextUrl.searchParams.get("token");
  const tokenFromCookies = req.cookies.get("token")?.value;
  const response = NextResponse.next();

  // If the token is found in the URL, store it in cookies and redirect
  if (tokenFromUrl) {
    console.log("Token found in URL, setting cookie...");

      response.cookies.set("token", tokenFromUrl, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
  
      return NextResponse.redirect(new URL("/meals", req.url));
  }

  // Routes that should not be accessible when logged in
  if (req.nextUrl.pathname === "/signin" && tokenFromCookies) {
    try {
      jwt.verify(tokenFromCookies, process.env.JWT_SECRET as string);
      return NextResponse.redirect(new URL("/meals", req.url)); // Redirect only if token is valid
    } catch {
      response.cookies.delete("token"); // Invalid token, remove it
    }
  }

  // If the user is not authenticated, redirect to signin (except for signin itself)
  if (!tokenFromCookies && req.nextUrl.pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (!tokenFromCookies && req.nextUrl.pathname === "/signin") {
    return response; // Let them stay on /signin
  }


  // Verify token validity
  try {
    if (!tokenFromCookies) throw new Error("No token found");
    jwt.verify(tokenFromCookies, process.env.JWT_SECRET as string);
  } catch {
    response.cookies.delete("token");
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  
  return NextResponse.next();
}

// Middleware runs on all pages except static assets and API routes
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|api).*)",
};
