import { Image } from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";

function ProductCard({ href, image, name, price, altName }) {
  return (
    <Link className="" href={href}>
      <div className="w-72 rounded-md border bg-white dark:bg-slate-800 dark:border-none">
        <div className=" overflow-hidden rounded-t-md hover:opacity-80 transition">
          <Image
            as={NextImage}
            width={300}
            height={300}
            src={image}
            alt={altName}
            radius="none"
            isZoomed
            className="object-cover"
          />
        </div>

        <div className="pb-2 px-2">
          <h3 className="mt-4 text-medium dark:text-gray-200 text-gray-700">
            {name}
          </h3>
          <p className="mt-1 text-medium font-medium text-default-600 dark:text-gray-200">
            ${price}
          </p>
        </div>
      </div>
    </Link>
    // <div onClick={onClick} className={styles.product_card}>
    //   <div className={styles.imageContainer}>
    //   <Image src={image} alt={name} width={200} height={200} />
    //   </div>
    //   <div className={styles.product_info}>
    //     <div className={styles.title}>
    //       <h3 className={styles.text}>
    //         {name}
    //       </h3>
    //     </div>
    //     <p className={styles.text}>${price}</p>
    //   </div>
    // </div>
  );
}

export default ProductCard;
