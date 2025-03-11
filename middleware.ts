import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  console.log("Middleware called");

  const tokenFromUrl = req.nextUrl.searchParams.get("token");
  const tokenFromCookies = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  const isOnSigninPage = pathname === "/signin";

  console.log("Token from URL:", tokenFromUrl);
  console.log("Token from Cookies:", tokenFromCookies);

  // ✅ Set token from URL to cookies and redirect to /meals
  if (tokenFromUrl) {
    console.log("Setting token in cookies...");
    const res = NextResponse.redirect(new URL("/meals", req.url));
    res.cookies.set("token", tokenFromUrl, {
      httpOnly: true,
      secure: false, // Change to `true` in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return res;
  }

  // ✅ If token exists in cookies, verify it
  if (tokenFromCookies) {
    try {
      // jwt.verify(tokenFromCookies, process.env.JWT_SECRET!);
      // console.log("Token is valid");

      // 🚀 If user is on /signin but already authenticated, redirect to /meals
      if (isOnSigninPage) {
        return NextResponse.redirect(new URL("/meals", req.url));
      }
      return NextResponse.next(); // ✅ Allow access
    } catch (err : unknown) {
      console.error("Invalid token:");
      const res = NextResponse.redirect(new URL("/signin", req.url));
      res.cookies.delete("token");
      return res;
    }
  }

  // 🛑 If no token and not on /signin, redirect to /signin
  if (!tokenFromCookies && !isOnSigninPage) {
    console.log("No token, redirecting to /signin");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next(); // ✅ Allow access to /signin
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|api).*)",
};
