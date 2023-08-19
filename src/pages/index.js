import ProductCard from "../components/Product_card";
import { useContext } from "react";
import { SearchContext } from "../context/searchContext";
import Head from "next/head";


export default function Home({ products }) {
  // const { searchTerm } = useContext(SearchContext);

  // if (searchTerm) {
  //   products = products.filter((product) =>
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }
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
    const res = await fetch("http://localhost:3000/api/products");
    const data = await res.json();
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
