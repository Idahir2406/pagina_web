import { useState } from "react";

import { AiOutlineHeart } from "react-icons/ai";
import Incrementador from "../../components/littleComponents/incrementador";
import { useRouter } from "next/router";
import { Button, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Popover from "components/buttons/Popover";
import useSWR from "swr";
import { useLogContext } from "../../hooks/useIsLoggedIn";
import { useUser } from "hooks/useUser";
import fetcher from "../../services/fetcher";
export default function ProductDetails({ product, error }) {
  const { isLogged } = useLogContext();
  const { push } = useRouter();
  const { user, Loading, getUser } = useUser();
  const router = useRouter();
  const { data, isLoading } = useSWR(`/api/${router.asPath}`, fetcher);
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

  const handleAddCart = async () => {
    if (!isLogged) return push(`/auth/login?redirect=${router.asPath}`);

    if (quantity === 0) return setAdvice("Debes seleccionar una cantidad");
    console.log(data);
    const sendProducto = {
      _id: data._id,
      name: data.name,
      category: data.category,
      price: data.price,
      description: data.description,
      image: data.image,
      quantity,
    };
    const res = await fetch(`/api/user/products/${user.email}/${data._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendProducto),
    });
    if (res.status === 200) {
      const data = await res.json();
      setAdvice(data.msg);
    }
  };

  const handleWishClick = async () => {
    setWish(!wish);

    if (!wish) {
      await fetch(`/api/users/products/${product._id}/wishList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch(`/api/products/${product._id}/wishList`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2">
      {!isLoading && (
        <>
          <div className="mx-auto">
            <Image
              as={NextImage}
              alt="productImage"
              className="w-full h-full object-center object-cover"
              src={data.image}
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col mt-3 justify-self-center md:justify-self-auto">
            <h3 className="text-2xl">{data.name}</h3>
            <p className="text-lg">${data.price}</p>
            <p>{data.description}</p>
            <Incrementador onChange={(e) => setQuantity(e.target.value)} />
            <div className=" flex gap-4">
              <Popover message={advice} onPress={handleAddCart}>
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
        </>
      )}
    </div>
  );
}

// export async function getServerSideProps({ query: { id } }) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
//     if (res.status === 200) {
//       const product = await res.json();
//       return {
//         props: {
//           product,
//         },
//       };
//     }
//     return {
//       props: {
//         error: {
//           statusCode: res.status,
//           statustext: "Invalid ID",
//         },
//       },
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
