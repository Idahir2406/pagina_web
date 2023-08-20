import ProductCard from "../components/Product_card";
import Head from "next/head";


export default function Home({ products }) {

  return (
    <div className="mx-auto  lg:max-w-7xl  ">
      <Head>
        <title>HomePage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
    </div>
  );
}

export async function getServerSideProps() {
  try {
    console.log("entro a getServerSideProps");
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products");
    const data = await res.json();
    console.log(data);
    return {
      props: {
        products: data,
      },
    };
  } catch (error) {
    
    console.log("este es el mensaje de error: ", error);
    return {
      props: {
        products: [],
      },
    }
  }
}
