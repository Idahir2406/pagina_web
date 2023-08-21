import { useState } from "react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Incrementador from "../../components/littleComponents/incrementador";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Image } from "@nextui-org/react";

import Popover from "components/buttons/popover"

export default function ProductDetails({ product, error }) {

  const { push } = useRouter();
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [wish, setWish] = useState(false);
  const [advice, setAdvice] = useState("");
  const router = useRouter();
  if (error && error.statusCode) {
    return (
      <h1>
        {error.statustext}, {error.statusCode}
      </h1>
    );
  }

  const handleAddCart = async () => {
    if (!session) return push(`/auth/login?redirect=${router.asPath}`);
    

    if (quantity === 0) return setAdvice("Debes seleccionar una cantidad");
    const sendProducto = {
      _id: product._id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity,
    };
    const res = await fetch(
      `/api/user/products/${session.user.email}/${product._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendProducto),
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
        `/api/users/products/${product._id}/wishList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      await fetch(
        `/api/products/${product._id}/wishList`,
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
    <div className="grid md:grid-cols-2">
      <div className="mx-auto">
        <Image
          alt="productImage"
          className="w-full h-full object-center object-cover"
          src={product.image}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col mt-3 justify-self-center md:justify-self-auto">
        <h3 className="text-2xl">{product.name}</h3>
        <p className="text-lg">${product.price}</p>
        <p>{product.description}</p>
        <Incrementador onChange={(e) => setQuantity(e.target.value)} />
        <div className=" flex gap-4">
          <Popover
            
            message={advice}
            onPress={handleAddCart}
          >
            Añadir al Carrito
          </Popover>
          <Button
            className="bg-transparent border border-red-300"
            isIconOnly
            onMouseEnter={() => setWish(false)}
            onMouseLeave={() => setWish(true)}
            onPress={() => {
              handleWishClick();
            }}
          >
            <AiOutlineHeart className="text-red-500" size={25} />
          </Button>
        </div>
        <div>
          <h2>Comentarios</h2>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
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
