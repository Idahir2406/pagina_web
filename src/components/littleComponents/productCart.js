import { useState, useEffect, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Selector } from "./selector";
import QuantityContext from "context/quantityContext";
import Skeleton from "react-loading-skeleton";
import io from 'socket.io-client';

const socket = io('http://localhost:3001',{
  transports: ['websocket', 'polling', 'flashsocket'],
  cors:{
    origin: 'http://localhost:3000',
  }
})

export default function ProductCart({
  name,
  redirect,
  description,
  price,
  image,
  id,
  quantity,
  email,
  deleteProduct,
  loading,// Prop para actualizar la cantidad en el carrito
}) {

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selected, setSelected] = useState(quantity);

  const addProduct = async (email, id) => {
    const res = await fetch(`http://localhost:3000/api/user/products/${email}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: selected }),
    }).catch((err) => console.log(err));
    if(res.status === 200){
      socket.emit('mensaje', email);
    }
  };

  useEffect(() => {
    addProduct(email, id);
  }, [selected]);

  return (
    <div className="flex border-t w-10/12 items-center h-72 mb-4 gap-10" key={id}>
      <div className="w-48 h-52 rounded-md overflow-hidden">
        {loading ? (
          <Skeleton height={200} width={200} />
        ) : (
          <Image
            className="w-full h-full object-cover"
            alt="cartProductImage"
            src={image}
            width={200}
            height={200}
          />
        )}
      </div>
      <div className="flex items-start flex-wrap justify-between w-2/3">
        <div className="flex flex-col h-52 gap-1">
          {loading ? (
            <>
              <Skeleton height={20} width={200} />
              <Skeleton height={16} width={200} />
              <Skeleton height={16} width={80} />
            </>
          ) : (
            <>
              <p className="text-md cursor-pointer" onClick={redirect}>
                {name}
              </p>
              <p className="text-sm text-gray-500">{description}</p>
              <p className="text-sm">${price}.00</p>
            </>
          )}
        </div>
        <Selector options={options} selected={selected} setSelected={setSelected} />
        <button
          onClick={deleteProduct}
          type="button"
          className="text-gray-400 hover:text-gray-600"
        >
          <IoMdClose className="cursor-pointer" size={20} />
        </button>
      </div>
    </div>
  );
}
