import Head from "next/head";
import dynamic from "next/dynamic";
import { CategoriesSelector } from "../components/dropdowns/selector/CategoriesSelector";
import { useRouter } from "next/router";
import { categories } from "../context/types";
import { PriceSelector } from "../components/dropdowns/selector/PriceSelector";
const ProductCard = dynamic(import("components/Product_card"));
export default function Home({ products }) {
  const router = useRouter();

  const filteredByCategoryProducts = products.filter((product) => {
    if (router.query.category === "1" || !router.query.category) {
      return product.category;
    }
    return product.category === router.query.category;
  });

  const filteredByPriceProducts = filteredByCategoryProducts.filter(
    (product) => {
      if (router.query.price === "1" || !router.query.price) {
        return product.price;
      }
      return (
        product.price <= parseInt(router.query.price) || !router.query.price
      );
    }
  );
  return (
    <>
      <Head>
        <title>Inicio | Tienda</title>
        <meta
          name="description"
          content="Esta es una web-store de adornos navideños"
        />
      </Head>
      <div className="mt-20 mb-10">
        <h1 className="text-5xl font-semibold my-4">
          {categories.find((category) => category.id === router.query.category)
            ? categories.find(
                (category) => category.id === router.query.category
              ).name
            : "Comprar adornos navideños"}
        </h1>
        <p className=" max-w-3xl">
          ¡Esta Navidad, transforma tu hogar en un lugar mágico con nuestra
          increíble variedad de adornos navideños! 🎄 Desde brillantes esferas y
          luces brillantes hasta figuras encantadoras y guirnaldas festivas,
          tenemos todo lo que necesitas para crear un ambiente cálido y
          acogedor.
        </p>
      </div>
      <div className="flex  my-4 gap-5">
        <CategoriesSelector />
        <PriceSelector />
      </div>
      <div className="grid  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 ">
        {filteredByPriceProducts.map((product) => (
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
      },
    };
  }
};
