import React, { useEffect, useState, useContext, useMemo } from "react";
import { useRouter } from "next/router";
import styles from "styles/cart.module.css";
import ProductCart from "components/littleComponents/productCart";
import QuantityContext from "context/quantityContext";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import "react-loading-skeleton/dist/skeleton.css";
import Head from "next/head";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling", "flashsocket"],
  cors: {
    origin: "http://localhost:3000",
  },
});

const Cart = ({ userData, productsData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(userData);
  const [products, setProducts] = useState(productsData);
  const [calculo, setCalculo] = useState({
    subtotal: 0,
    envio: 10,
    total: 0,
  });

  const deleteProduct = async (productId) => {
    socket.on("evento", (data) => {
      // Filtrar los productos y crear un nuevo array sin el producto eliminado
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
    });
    socket.emit("mensaje", user.email);
    const res = await fetch(
      `http://localhost:3000/api/user/products/${user.email}/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      console.log("Producto eliminado");
    }
  };
  

  useMemo(() => {
    const subtotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setCalculo({
      subtotal,
      envio: 10,
      total: subtotal + 10,
    });
  }, [products, socket]);

  useEffect(() => {
    socket.on("evento", (data) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          const updatedProduct = data.cart.find(
            (item) => item.product === product._id
          );

          if (updatedProduct) {
            return {
              ...product,
              quantity: updatedProduct.quantity,
            };
          }

          return product;
        })
      );
      setCalculo;
    });
  }, []);

  return (
    <div className="mt-10">
      {products.length > 0 && (
        <h1 className="text-4xl mb-6 block font-bold">Carrito</h1>
      )}
      <div className={styles.sections}>
        <Head>
          <title>Cart Page</title>
        </Head>

        <section className="flex flex-col">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCart
                key={product._id}
                id={product._id}
                email={user.email}
                redirect={() => router.push(`/products/${product._id}`)}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                image={product.image}
                deleteProduct={() => deleteProduct(product._id)}
                loading={loading}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-80">
              <h1 className="text-2xl">No hay productos en el carrito</h1>
              <p>
                Revisa tus favoritos o{" "}
                <Link className="text-violet-600 hover:underline" href="/">
                  continua comprando
                </Link>
                .
              </p>
            </div>
          )}
        </section>
        <section className="flex p-6 justify-center flex-col bg-gray-100 h-80 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Resumen de compra</h2>
          </div>
          <div className="flex text-gray-600 text-sm flex-col divide-y gap-6">
            <div className="flex justify-between ">
              <p>Subtotal </p>
              <p className="text-black">${calculo.subtotal}.00</p>
            </div>
            <div className="flex justify-between pt-3">
              <p>Envío </p>
              <p className="text-black">${calculo.envio}.00</p>
            </div>
            <div className="flex justify-between pt-4 text-black text-base font-semibold">
              <p>Total </p>
              <p>${calculo.total}.00</p>
            </div>
          </div>

          <button
            type="button"
            className="text-white bg-violet-600 hover:bg-violet-700 p-4 rounded-md mt-6"
          >
            Continuar con el pago
          </button>
        </section>
      </div>
    </div>
  );
};

export default Cart;

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
    `http://localhost:3000/api/user/${session.user.email}`
  );
  const userData = await res.json();
  const productsData = await Promise.all(
    userData.cart.map(async (product) => {
      const res = await fetch(
        `http://localhost:3000/api/products/${product.product}`
      );

      const data = await res.json();
      return {
        ...data,
        quantity: product.quantity,
      };
    })
  );

  return {
    props: {
      userData,
      productsData,
    },
  };
}
