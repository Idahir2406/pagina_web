import { OrderList } from "./OrderList";
import Link from "next/link";
import { Progress } from "@nextui-org/react";
export const Order = ({ pedido, index }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-6 py-6 ">
        <h2 className="text-2xl font-bold ">Pedido #{index + 1}</h2>
        <Link href="#" className="text-indigo-700 dark:text-indigo-500 hover:underline text-sm">
          Ver factura {"->"}{" "}
        </Link>
      </div>
      <div className="border rounded-md  bg-white dark:border-0 dark:bg-slate-800 2xl:max-w-7xl ">
        <OrderList order={pedido} />
        <div className="p-8 col-span-12 border-t flex flex-col gap-3">
            <h3>Preparing to ship on March 24, 2021</h3>

            <Progress color="secondary" size="sm" aria-label="Loading..." value={45} className="" />
            <div className=" flex items-center justify-between px-4">
              <p className="text-default-500 text-sm">
                Pedido realizado
              </p>
              <p className="text-default-500 text-sm">
                Procesado
              </p>
              <p className="text-default-500 text-sm">
                Enviado
              </p>
              <p className="text-default-500 text-sm">
                Entregado
              </p>

            </div>
          </div>
      </div>
    </div>
  );
};
