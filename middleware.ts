import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  console.log("✅ Middleware called");

  const pathname = req.nextUrl.pathname;
  const isOnSigninPage = pathname === "/signin";

  const tokenFromUrl = req.nextUrl.searchParams.get("token");
  const tokenFromCookies = req.cookies.get("collector_token")?.value;

  const isAuthSuccessPage = pathname === "/signin/success";

  console.log("🔍 Token from URL:", tokenFromUrl);
  console.log("🍪 Token from Cookies:", tokenFromCookies);

  // Skip static files and /auth/success
  if (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    isAuthSuccessPage
  ) {
    return NextResponse.next();
  }

  async function verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET!)
      );
      return payload;
    } catch {
      return null;
    }
  }

  if (tokenFromUrl) {
    const payload = await verifyToken(tokenFromUrl);
    if (!payload) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const redirectTo = new URL("/signin/success", req.url);

    const res = NextResponse.redirect(redirectTo);
    res.cookies.set("collector_token", tokenFromUrl, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
    });

    if (payload.userId) {
      res.cookies.set("collector_id", String(payload.userId), {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    console.log("✅ Token set, redirecting to /auth/success");
    return res;
  }

  if (tokenFromCookies) {
    const payload = await verifyToken(tokenFromCookies);
    if (!payload) {
      const res = NextResponse.redirect(new URL("/signin", req.url));
      res.cookies.delete("collector_token");
      res.cookies.delete("collector_id");
      return res;
    }

    if (isOnSigninPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (!tokenFromCookies && !isOnSigninPage && !tokenFromUrl) {
    console.log("🚫 No token found. Redirecting to /signin");
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|auth/success).*)"],
};
