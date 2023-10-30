import { Order } from "../../components/products/Order";
import { Summary } from "../../components/products/Summary";
import { useUser } from "hooks/useUser";
import { Link } from "@nextui-org/react"
import { AiOutlineWhatsApp } from "react-icons/ai";
export default function Orders() {
  const { user, Loading } = useUser();
  return (
    <div className="">
      {!Loading && (
        <>
          {user.orders.map((orderData, index) => {
            return (
              <div className="flex flex-col gap-4" key={index}>
                <Order key={index} pedido={orderData} index={index} />

                <div className="rounded-md  bg-gray-50 dark:border-0 dark:bg-slate-600 2xl:max-w-7xl p-8 grid grid-cols-7">
                  <div className="col-span-2">
                    <h2 className=" ">Dirección de facturación </h2>
                  </div>
                  <div className="col-span-2">
                    <h2>Información de pago</h2>
                    <div className="text-default-500 text-sm">
                      <p>Transferencia</p>
                      <Link
                        href={`https://wa.me/593986501698?text=Hola,%20soy%20${
                          user.username
                        }%20y%20estoy%20interesad@%20en%20los%20productos%20que%20están%20en%20la%20siguiente%20orden:%20*${orderData._id}*%20que%20cuenta%20con%20${orderData.order.length}%20${orderData.order.length ===1 ? `producto` : `productos`}%20y%20un%20total%20de%20${orderData.total}$`}
                        target="_blank"
                      >
                        Coordinar por Whatsapp
                        <AiOutlineWhatsApp size={25} />
                      </Link>
                      {/* <p>{orderData.paymentMethod.name}</p>
                      <p>{orderData.paymentMethod.type}</p> */}
                    </div>
                  </div>
                  <Summary
                    subtotal={orderData.subtotal}
                    total={orderData.total}
                    shipping={orderData.shippingCost}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

// export async function getServerSideProps(ctx) {
//   const session = await getServerSession(ctx.req, ctx.res, authOptions);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/orders?email=${session.user.email}`
//   );
//   const data = await res.json();
//   return {
//     props: {
//       ordersData: data.orders,
//     },
//   };
// }
