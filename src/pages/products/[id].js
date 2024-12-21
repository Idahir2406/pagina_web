import { useState } from "react";

import { AiOutlineHeart } from "react-icons/ai";
import Incrementador from "../../components/littleComponents/incrementador";
import { useRouter } from "next/router";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  Image,
  Input,
  Tooltip,
} from "@nextui-org/react";
import NextImage from "next/image";
import Popover from "components/buttons/Popover";
import useSWR from "swr";
import { useLogContext } from "../../hooks/useIsLoggedIn";
import { useUser } from "hooks/useUser";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TbShoppingCartPlus } from "react-icons/tb";
import Head from "next/head";
import { TbTruckDelivery } from "react-icons/tb";
export default function ProductDetails({ data }) {
  const { isLogged } = useLogContext();
  const { push } = useRouter();
  const { user } = useUser();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [wish, setWish] = useState(false);
  const [advice, setAdvice] = useState("");

  const handleAddCart = async () => {
    if (!isLogged) return push(`/auth/signin?redirect=${router.asPath}`);

    if (quantity === 0) return setAdvice("Debes seleccionar una cantidad");

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
      await fetch(`/api/users/products/${router.query.id}/wishList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await fetch(`/api/products/${router.query.id}/wishList`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const sizes = [
    {
      name: "XS",
      measureLength: 68,
      value: "XS",
    },
    {
      name: "S",
      measureLength: 70,
      value: "S",
    },
    {
      name: "M",
      measureLength: 72,
      value: "M",
    },
    {
      name: "L",
      measureLength: 74,
      value: "L",
    },
    {
      name: "XL",
      measureLength: 76,
      value: "XL",
    },
  ];

  return (
    <>
      <Head>
        <title>{data.name} - Christmas Store</title>
      </Head>
      <div className="grid md:grid-cols-2 gap-10">
        <picture className="">
          <Image
            removeWrapper
            as={NextImage}
            width={500}
            height={500}
            isBlurred
            alt="productImage"
            className="w-full h-full object-center object-cover"
            src={data.image}
          />
        </picture>
        <Card>
          <CardBody>
          <div className="flex flex-col  gap-3 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold">{data.name}</h3>
            <Tooltip
              content="Añadir a favoritos"
              placement="left"
              color="secondary"
            >
              <Button
                size="sm"
                isIconOnly
                onPress={() => {
                  handleWishClick();
                }}
                variant="flat"
                color="danger"
                className="text-xl"
              >
                {wish ? (
                  <FaHeart className="text-danger" />
                ) : (
                  <FaRegHeart className="text-danger" />
                )}
              </Button>
            </Tooltip>
          </div>
          <p className="text-2xl font-bold">${data.price}.00</p>

          <section className="space-y-2">
            <h3 className="font-medium text-default-600">
              Selecciona el tamaño del adorno:
            </h3>
            <div className="flex justify-between items-center">
              {sizes.map((size, index) => (
                <Tooltip key={index} content={`Largo: ${size.measureLength}`}>
                  <Button
                    color={
                      selectedSize === size.value ? "secondary" : "default"
                    }
                    variant="bordered"
                    size="sm"
                    className="text-sm"
                    onPress={() => setSelectedSize(size.value)}
                  >
                    {size.name}
                  </Button>
                </Tooltip>
              ))}
            </div>
          </section>
          <div className=" flex flex-col gap-4">
            <Button color="secondary">Comprar ahora</Button>
            <Popover
              variant="ghost"
              color="secondary"
              endContent={<TbShoppingCartPlus size={18} />}
              message={advice}
              onPress={handleAddCart}
            >
              Añadir al Carrito
            </Popover>
          </div>
          <Incrementador onChange={(e) => setQuantity(e.target.value)} />
          <div>
            <Accordion variant="light" defaultExpandedKeys={"1"}>
              <AccordionItem
                key={1}
                title={<p className="text-sm">Descripción</p>}
              >
                <h3 className="text-sm text-default-500">Detalles del producto:</h3>
                <p>{data.description}</p>
              </AccordionItem>
              <AccordionItem
                key={2}
                title={
                  <div className="flex justify-between items-center">
                    <p className="text-sm">Envío</p>
                    <TbTruckDelivery color="#009744" size={20} />
                  </div>
                }
              >
                <h3 className="text-[#009744] text-sm">Servientrega</h3>
                <p>
                  Envío gratis a partir de $100.00. El tiempo de entrega es de 2
                  a 3 días hábiles.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}
