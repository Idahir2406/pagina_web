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
      <div className="grid  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 justify-items-center">
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
