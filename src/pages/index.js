import ProductCard from "../components/Product_card";
import { useContext,useEffect } from "react";
import { SearchContext } from "../context/searchContext";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next"
import UserContext from "../context/user/userContext";
export default function Home({ products,userData,session }) {
  const { searchTerm } = useContext(SearchContext); 
  const {getUser} = useContext(UserContext);
  useEffect(() => {

    getUser(session.user.email);
    if(session){
      localStorage.setItem("user",JSON.stringify(userData))
    }

  },[userData,session])

  // useEffect(() => {
  //   // Suscribirse a un evento
  //   socket.on('evento', (data) => {
  //     console.log('Evento recibido:', data);
  //   });

  //   // Enviar un evento al servidor
  //   socket.emit('mensaje', 'Hola, servidor!');
  // }, []);

  if (searchTerm) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  return (
    <div className="bg-white">
      <div className="mx-auto py-16  sm:py-24 lg:max-w-7xl ">
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
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
      // Si no hay sesión, puedes devolver los productos sin datos de usuario
      const productsRes = await fetch("http://localhost:3000/api/products");
      const products = await productsRes.json();

      return {
        props: {
          products,
          session: null,
          userData: null,
        },
      };
    }
    
    // Si hay sesión, obtienes los datos del usuario y los productos
    const [productsRes, userRes] = await Promise.all([
      fetch("http://localhost:3000/api/products"),
      fetch(`http://localhost:3000/api/user/${session.user.email}`)
    ]);

    const [products, userData] = await Promise.all([
      productsRes.json(),
      userRes.json()
    ]);
    
    

    return {
      props: {
        products,
        session,
        userData
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
        session: null,
        userData: null,
        error: "Error al obtener los datos del usuario y los productos",
      },
    };
  }
}
