import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/@([^/]+)\/?$/);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = `/handle/${match[1]}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/@:path*"],
};
