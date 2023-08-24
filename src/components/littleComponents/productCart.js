import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { Selector } from "./selector";
import Link from "next/link";
import { IconButton } from "components/buttons/IconButton";
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
    <div className="border-t grid grid-cols-6 md:grid-cols-9 py-6 w-full max-w-5xl gap-4">
      <div className="col-span-3 md:col-span-2  rounded-md overflow-hidden ">
        <Image
          className="w-full h-full object-cover"
          alt="cartProductImage"
          src={product.image}
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col md:flex-row col-span-2 md:col-span-6 justify-between gap-6 md:gap-0">
        <div className="md:col-span-4 flex flex-col  gap-1 ">
          <Link
            className="text-md cursor-pointer"
            href={`/products/${product._id}`}
          >
            {product.name}
          </Link>
          <p className="text-sm text-gray-500 dark:text-default-600">
            {product.description}
          </p>
          <p className="text-sm">${product.price}.00</p>
        </div>
        <div className="col-span-1 md:col-span-1">
        <Selector
          options={options}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      </div>
      
      <div className="col-span-1 md:col-span-1 text-end">
        <IconButton type="button" onClick={() => deleteProduct(product._id)}>
          <IoMdClose className="cursor-pointer" size={20} />
        </IconButton>
      </div>
    </div>
  );
}
