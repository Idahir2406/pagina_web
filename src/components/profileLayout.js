import Link from 'next/link'
export default function ProfileLayout({children}) {
  return (
    <div className='flex flex-wrap mt-10'>
      <div className="hidden md:border-r md:w-[20%] md:flex md:flex-col md:gap-10">
        <Link href="/user/settings/profile">Información personal</Link>
        <Link href="/user/settings/orders">Pedidos</Link>
        <Link href="/user/settings/payment">Métodos de pago</Link>
        <Link href="#">Cerrar sesión</Link>
      </div>
      <div className="w-full flex-wrap md:w-[80%]">
        <div className='ms-8'>
        {children}
        </div>
      </div>

    </div>
  )
}
