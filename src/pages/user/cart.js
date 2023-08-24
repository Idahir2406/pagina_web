import { useEffect, useState } from "react";

import ProductCart from "components/littleComponents/productCart";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";
import { useUser } from "../../hooks/useUser";
import { CartProduct } from "components/littleComponents/ProductSkeleton";
import { PayModal } from "../../components/modals/PayModal";
const Cart = () => {
  const { user, Loading, getUser } = useUser();
  const [calculo, setCalculo] = useState({
    subtotal: 0,
    envio: 10,
    total: 0,
  });

  const deleteProduct = async (productId) => {
    const res = await fetch(`/api/user/products/${user.email}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
    if (res.status === 200) {
      console.log("Producto eliminado");
      getUser();
    }
  };

  const calculoTotal = (quantity) => {
    if (quantity) {
      const subtotal = user.cart.reduce(
        (acc, product) => acc + product.price * quantity,
        0
      );
      return setCalculo({
        subtotal,
        envio: 10,
        total: subtotal + 10,
      });
    }
    const subtotal = user.cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setCalculo({
      subtotal,
      envio: 10,
      total: subtotal + 10,
    });
  };

  const addProduct = async (quantity, id) => {
    try {
      const res = await fetch(`/api/user/products/${user.email}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
    } finally {
      calculoTotal(quantity);
    }
  };

  useEffect(() => {
    getUser();
    if (!Loading) calculoTotal();
  }, [Loading]);

  return (
    <div className="mt-10">
      <Head>
        <title>Carrito</title>
        <meta name="description" content="Carrito de compras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl mb-6 block font-bold dark:text-gray-200">
        Carrito
      </h1>

      <div className="grid md:grid-cols-8  lg:grid-cols-12 gap-4">
        <section className="flex flex-col items-center md:items-start md:col-span-5 lg:col-span-8  ">
          {!Loading ? (
            <>
              {user.cart.map((product, index) => (
                <ProductCart
                  loading={Loading}
                  key={index}
                  product={product}
                  addProduct={addProduct}
                  deleteProduct={deleteProduct}
                />
              ))}
            </>
          ) : (
            <CartProduct />
          )}
          {!user.cart ||
            (user.cart.length <= 0 && (
              <>
                <div className="flex flex-col justify-center items-center h-80  w-full">
                  <h1 className="text-2xl font-medium">No hay productos en el carrito</h1>
                  <p>
                    Revisa tus favoritos o{" "}
                    <Link className="text-indigo-500 hover:underline" href="/">
                      continua comprando
                    </Link>
                    .
                  </p>
                </div>
              </>
            ))}
        </section>

        <section className="flex p-6 justify-center flex-col bg-gray-100 dark:bg-slate-800 h-80 rounded-lg  md:col-span-3 lg:col-span-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl dark:text-gray-200">Resumen de compra</h2>
          </div>
          <div className="flex text-gray-600 dark:text-gray-200 text-sm flex-col divide-y gap-6 mb-6">
            <div className="flex justify-between ">
              <p>Subtotal </p>
              <p>${calculo.subtotal}.00</p>
            </div>
            <div className="flex justify-between pt-3">
              <p>Envío </p>
              <p>${calculo.envio}.00</p>
            </div>
            <div className="flex justify-between pt-4 text-base font-semibold">
              <p>Total </p>
              <p>${calculo.total}.00</p>
            </div>
          </div>
          <PayModal calculo={calculo} />
          {/* <Popover
            className="w-full py-6 text-medium hover:bg-violet-600 mt-5"
            onClick={handleSubmitOrder}
            message={message}
          >
            Continuar con el pago
          </Popover> */}
        </section>
      </div>
    </div>
  );
};

export default Cart;
