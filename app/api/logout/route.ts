import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("collector_token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
  response.cookies.set("collector_id", "", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
  return response;
}
