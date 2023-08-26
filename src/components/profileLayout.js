import Link from "next/link";
export default function ProfileLayout({ children }) {
  return (
    <div className="grid md:divide-x-1 md:grid-cols-12 mt-10 gap-4">
      <div className="hidden md:col-span-2   md:flex md:flex-col md:gap-10">
        <Link href="/user/settings/profile">Información personal</Link>
        <Link href="/user/settings/addresses">Dirección</Link>
        <Link href="/user/settings/payment">Métodos de pago</Link>
        <Link href="#">Cerrar sesión</Link>
      </div>
      <div className="w-full flex-wrap md:col-span-10 ">{children}</div>
    </div>
  );
}
