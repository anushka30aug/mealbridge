import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  console.log("Middleware called");

  async function verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      return payload;
    } catch (error) {
      return null;
    }
  }

  const tokenFromUrl = req.nextUrl.searchParams.get("token");
  const tokenFromCookies = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  const isOnSigninPage = pathname === "/signin";

  console.log("Token from URL:", tokenFromUrl);
  console.log("Token from Cookies:", tokenFromCookies);

  if (pathname.startsWith("/assets/")) {
    return NextResponse.next();
  }

  if (tokenFromUrl) {
    const payload = await verifyToken(tokenFromUrl);
    if (!payload) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    console.log("Setting token in cookies...");
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set("token", tokenFromUrl, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    if (payload.userId) {
      res.cookies.set("userId", String(payload.userId), {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });
    }
    return res;
  }

  if (tokenFromCookies) {
    const payload = await verifyToken(tokenFromCookies);
    console.log("Decoded -  ", payload);
    if (!payload) {
      const res = NextResponse.redirect(new URL("/signin", req.url));
      res.cookies.delete("token");
      res.cookies.delete("userId");
      return res;
    }

    if (isOnSigninPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (!tokenFromCookies && !isOnSigninPage) {
    console.log("No token, redirecting to /signin");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|api).*)",
};
