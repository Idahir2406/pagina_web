import Head from "next/head";
import dynamic from "next/dynamic";

const ProductCard = dynamic(import("components/Product_card"));

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>HomePage</title>
        <meta name="description" content="Esta es una web-store de adornos navideños" />
 

      </Head>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 justify-items-center">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard
              href={`/products/${product._id}`}
              image={product.image}
              name={product.name}
              altName={product.name}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const data = await res.json();

    return {
      props: {
        products: data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log("este es el mensaje de error: ", error);
    return {
      props: {
        products: [],
      }
      
    };
  }
};
