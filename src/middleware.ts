import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token.user.role)
    if (req.nextUrl.pathname.startsWith("/admin") && (req.nextauth.token.user as { role: string }).role !== "admin") {
      return NextResponse.rewrite(new URL("/auth/error?error=No estas autorizado para acceder a esta página", req.url))
    }
  },
  // {
  //   callbacks: {
  //     authorized: ({ token }) => !!token,
  //   },
  // }
)

  export const config = { matcher: ["/admin/dashboard","/admin/productManagement"] }