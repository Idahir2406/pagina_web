import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Selector } from "./selector";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";

export default function ProductCart({
  product,
  addProduct,
  deleteProduct,
  loading,
  // Prop para actualizar la cantidad en el carrito
}) {
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selected, setSelected] = useState(product.quantity);

  // useEffect(() => {
  //   addProduct(selected,product.id);
  // }, [selected]);

  return (
    <div className="flex border-t w-10/12 items-center h-72 mb-4 gap-10" >
      <div className="w-48 h-52 rounded-md overflow-hidden">
        {loading ? (
          <Skeleton height={200} width={200} />
        ) : (
          <Image
            className="w-full h-full object-cover"
            alt="cartProductImage"
            src={product.image}
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
              <Link className="text-md cursor-pointer" href={`/products/${product._id}`}>
                {product.name}
              </Link>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-sm">${product.price}.00</p>
            </>
          )}
        </div>
        <Selector options={options} selected={selected} setSelected={setSelected} />
        <button
          onClick={()=>deleteProduct(product._id)}
          type="button"
          className="text-gray-400 hover:text-gray-600"
        >
          <IoMdClose className="cursor-pointer" size={20} />
        </button>
      </div>
    </div>
  );
}
