//react and next imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { BiMenu } from "react-icons/bi";
//icons imports
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle, BiLogOut, BiCog } from "react-icons/bi";
//little components imports
import { Dropdown } from "./littleComponents/dropdown";
import { Searchbox } from "./searchbox";
import Head from "next/head";
import Avatar from "./littleComponents/avatar";
import { IconButton } from "./littleComponents/iconButton";
import { NavLink } from "./littleComponents/navLink";
import socket from "services/socket";

export default function Navbar({ session }) {
  const [user, setUser] = useState(session); 
  const { pathname } = useRouter();
  const userData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  const handleLogout = () => {
    signOut({ redirect: false });
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
      setUser(userData);
  }, []);


  useEffect(() => {
    socket.on("profileResponse", (data) => {
      setUser(data);
    });
  }, [socket]);

  if (pathname === "/auth/login" || pathname === "/auth/registro") {
    return (
      <nav className="flex pt-5 w-[92%] justify-between items-center mx-auto">
        <div className="flex gap-6 justify-center items-center">
          <NavLink href="/">
            <p className="text-xl">Christmas</p>
            <p className="text-xl">STORE</p>
          </NavLink>
        </div>
      </nav>
    );
  }

  const notifications = [
    {
      id: 1,
      content: "Notificación 1",
      link: "http://localhost:3000/products/1",
    },
    {
      id: 2,
      content: "Notificación 2",
      link: "http://localhost:3000/products/1",
    },
    {
      id: 3,
      content: "Notificación 3",
      link: "http://localhost:3000/products/1",
    },
  ];
  const authOptions = [
    {
      id: 1,
      content: "Iniciar sesión",
      link: "http://localhost:3000/auth/login",
    },
    {
      id: 2,
      content: "Registrarse",
      link: "http://localhost:3000/auth/registro",
    },
  ];
  const profileOptions = [
    {
      id: 1,
      content: <p>Perfil</p>,
      icon: <BiUserCircle className="mr-3" size={25} />,
      link: "http://localhost:3000/user/settings/profile",
    },
    {
      id: 2,
      content: <p>Configuración</p>,
      icon: <BiCog className="mr-3" size={25} />,
      link: "http://localhost:3000/products/1",
    },

    {
      id: 3,
      content: <p>Cerrar sesión</p>,
      icon: <BiLogOut className="mr-3" size={25} />,
      onClick: handleLogout,
    },
  ];

  return (
    //
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <nav className="flex pt-5 w-[92%] justify-between items-center mx-auto">
        <div className="flex gap-6 justify-center items-center">
          <NavLink href="/">
            <p className="text-xl">Christmas</p>
            <p className="text-xl">STORE</p>
          </NavLink>
        </div>
        {pathname != "/user/settings/profile" && <Searchbox />}

        <div className="sm:hidden">
          <BiMenu className="text-3xl cursor-pointer" />
        </div>

        {user!= null ? (
          <div className="hidden sm:flex items-center justify-between gap-16">
            <NavLink href="/user/products/cart">Carrito</NavLink>
            <NavLink href="/user/products/wishList">Favoritos</NavLink>
            <div className="flex gap-1 items-center justify-between">
              <Dropdown options={notifications}>
                <IconButton size={25}>
                  <IoMdNotificationsOutline />
                </IconButton>
              </Dropdown>
              <Dropdown options={profileOptions}>
                {user && user.image ? (
                  <Avatar src={user.image} />
                ) : (
                  <Avatar noSrc />
                )}
              </Dropdown>
            </div>
          </div>
        ) : (
          <Dropdown options={authOptions}>
            <p className="bg-violet-600 text-white p-3 font-bold rounded-md">
              Quiero comprar
            </p>
          </Dropdown>
        )}
      </nav>
    </>
  );
}
