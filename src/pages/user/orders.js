import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { Order } from "../../components/products/Order";
import { Summary } from "../../components/products/Summary";
export default function Orders({ ordersData }) {
  return (
    <div className="">
      {ordersData.map((orderData, index) => {
        return (
          <div className="flex flex-col gap-4" key={index}>
            <Order key={index} pedido={orderData} index={index} />

            <div className="rounded-md  bg-gray-50 dark:border-0 dark:bg-slate-600 2xl:max-w-7xl p-8 grid grid-cols-7">
              <div className="col-span-2">
                <h2 className=" ">Dirección de facturación </h2>
              </div>
              <div className="col-span-2">
                <h2>
                  Información de pago
                </h2>
                <div className="text-default-500 text-sm">
                <p>{orderData.paymentMethod.name}</p>
                <p>{orderData.paymentMethod.type}</p>
                </div>
                </div>
              <Summary subtotal={orderData.subtotal} total={orderData.total} shipping={orderData.shippingCost} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const res = await fetch(
    `http://localhost:3000/api/user/orders?email=${session.user.email}`
  );
  const data = await res.json();
  return {
    props: {
      ordersData: data.orders,
    },
  };
}
