import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const view = request.cookies.get("view");
  const pathname = request.nextUrl.pathname;

  if (!view) {
    const response = NextResponse.next();
    response.headers.set(
      "Set-Cookie",
      "view=card; Max-Age=31536000; SameSite=Strict; Path=/",
    );
    return response;
  }

  if (view.value && pathname === "/") {
    if (view.value === "table")
      return NextResponse.redirect(new URL("/table", request.nextUrl));

    if (view.value === "card")
      return NextResponse.redirect(new URL("/card", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
