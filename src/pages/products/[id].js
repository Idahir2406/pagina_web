import React, { useState, useContext, useEffect } from "react";
import styles from "styles/productDetails.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Incrementador from "../../components/littleComponents/incrementador";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserContext from "../../context/user/userContext";

export default function ProductDetails({ product, error }) {
  const { push } = useRouter();
  const { data: status } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [wish, setWish] = useState(false);
  const [advice, setAdvice] = useState("");

  if (error && error.statusCode) {
    return (
      <h1>
        {error.statustext}, {error.statusCode}
      </h1>
    );
  }
  
  const increment = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrement = () => {
    if (quantity >= 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddCart = async () => {
    if (status != "authenticated") return push("/auth/login");
    if (quantity === 0) return setAdvice("Debes seleccionar una cantidad");
    const res = await fetch(
      `http://localhost:3000/api/user/products/${user.email}/${product._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      setAdvice(data.msg);
      handleAdvice();
    }
  };

  const handleWishClick = async () => {
    setWish(!wish);

    if (!wish) {
      await fetch(
        `http://localhost:3000/api/users/products/${product._id}/wishList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      await fetch(
        `http://localhost:3000/api/products/${product._id}/wishList`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  const handleAdvice = () => {
    setTimeout(() => {
      setAdvice("");
    }, 3000);
  };

  return (
    <div className="flex flex-col md:flex md:flex-row md:justify-between md:w-full">
      <div className="w-full sm:h-full h-[40vh] md:w-1/2 rounded-lg overflow-hidden mx-auto">
        <Image
          alt="productImage"
          className="w-full h-full object-center object-cover"
          src={product.image}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col mt-3">
        <h3 className="text-2xl">{product.name}</h3>
        <p className="text-lg">${product.price}</p>
        <p className={styles.desc}>{product.description}</p>
        <Incrementador
          quantity={quantity}
          decrement={decrement}
          increment={increment}
        />
        <div className={styles.buttonsContainer}>
          <button
            onClick={() => {
              handleAddCart();
            }}
            className={styles.addCart}
          >
            Añadir al carrito
          </button>
          <button
          onMouseEnter={() => setWish(false)}
          onMouseLeave={() => setWish(true)}
            onClick={() => {
              handleWishClick();
            }}
            className={styles.addWish}
          >
            {wish ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
          </button>
        </div>
        <p className={styles.advice}>{advice}</p>
        <div>
          <h2>Comentarios</h2>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  try {

    

    const res = await fetch(`http://localhost:3000/api/products/${id}`);
    if (res.status === 200) {
      const product = await res.json();
      return {
        props: {
          product,
        },
      };
    }
    return {
      props: {
        error: {
          statusCode: res.status,
          statustext: "Invalid ID",
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}
