export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/userProducts/Cart",
    "/userProducts/wishList",
    `/user/settings/orders`,
    `/user/settings/payment`,
    `/user/settings/addresses`,
    `/user/settings/profile`,
  ]
};