import styles from "./Product_card.module.css";
import Image from "next/image";
import Link from "next/link";
function ProductCard({ href, image, name, price,altName }) {
  return (
    <Link href={href} className="group">
      <div className="aspect-h-1 aspect-w-1 h-60 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          width={200}
          height={200}
          src={image}
          alt={altName}
          className="h-full transition-all w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${price}</p>
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
