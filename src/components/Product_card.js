import Link from "next/link";
import Image from "next/image";
import { Card,CardHeader,CardFooter,Image as NextImage } from "@nextui-org/react";

function ProductCard({ href, image, name, price, altName }) {
  return (
    <Link href={href}>
      <Card >
        <CardHeader >
          <NextImage
            as={Image}
            priority
            width={300}
            height={300}
            src={image}
            alt={altName}
            isBlurred
            isZoomed
            className="object-cover"
          />
        </CardHeader>

        <CardFooter className="flex flex-col justify-start items-start">
          <h3 className="text-sm dark:text-gray-200 text-gray-700">
            {name}
          </h3>
          <p className="text-medium font-medium text-default-500 dark:text-gray-300">
            ${price}
          </p>
        </CardFooter>
      </Card>
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
