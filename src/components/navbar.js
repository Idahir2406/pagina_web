//react and next imports
import { signOut } from "next-auth/react";
//icons imports
import { Searchbox } from "./searchbox";
import { NavLink } from "./littleComponents/navLink";
import dynamic from "next/dynamic";
import { useUser } from "../hooks/useUser";
import { Button, DropdownItem } from "@nextui-org/react";
import ThemeSwitch from "./littleComponents/ThemeSwitch";
import { useLogContext } from "../hooks/useIsLoggedIn";
import Link from "next/link";
const DynamicLink = dynamic(() => import("next/link"));
const Dropdown = dynamic(() =>
  import("./dropdowns/ProfileDropdown").then((mod) => mod.ProfileDropdown)
);

export default function Navbar() {
  const { user, deleteUser, Loading } = useUser();
  const { isLogged, logout } = useLogContext();
  const handleLogout = async() => {
    const signOut = (await import('next-auth/react').then((mod) => mod.signOut))
    signOut({ redirect: false });
    logout();
    deleteUser();
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const profileOptions = [
    {
      label: "Perfil",
      url: "/user/settings/profile",
    },
    {
      label: "Configuración",
      url: "/products/1",
    },

    {
      label: "Cerrar sesión",
      action: handleLogout,
    },
  ];

  return (
    //
    <>
      <header className="w-full dark:bg-slate-800 bg-white shadow-sm sticky top-0 z-50 opacity-95">
        <nav className="flex py-5 w-[92%] justify-between items-center mx-auto">
          <div className="flex gap-6 justify-center items-center">
            <NavLink href="/">
              <p className="text-xl font-medium dark:text-white">Christmas</p>
              <p className="text-xl font-medium dark:text-white">STORE</p>
            </NavLink>
          </div>

          {isLogged ? (
            <div className="flex items-center justify-between gap-4 md:gap-16">
              <DynamicLink
                href="/user/cart"
                className="hidden md:block dark:text-white dark:hover:text-gray-200"
              >
                Carrito
              </DynamicLink>
              <DynamicLink
                className="hidden md:block dark:text-white dark:hover:text-gray-200"
                href="/user/orders"
              >
                Pedidos
              </DynamicLink>
              <DynamicLink
                href="/user/wishList"
                className="hidden md:block dark:text-white dark:hover:text-gray-200"
              >
                Favoritos
              </DynamicLink>
              <ThemeSwitch />

              <div className="flex gap-1 items-center justify-between">
                <Dropdown
                  src={!Loading && user && user.avatar }
                  username={!Loading && user && user.username }
                  options={profileOptions}
                  role={!Loading && user && user.role }
                >
                  <DropdownItem key="logout" onPress={handleLogout}>
                    Cerrar Sesión
                  </DropdownItem>
                </Dropdown>

                {/* <Dropdown options={notifications}>
                  <IconButton size={25}>
                    <IoMdNotificationsOutline />
                  </IconButton>
                </Dropdown>
                <Dropdown options={profileOptions}>
                  <Avatar isBordered  src={user.image} name={user.username} />
                </Dropdown> */}
                {/* <button onClick={toggleDarkMode} className="bg-violet-500 hover:bg-violet-600 py-2 px-3 rounded-md text-white">Dark Mode</button> */}
              </div>
            </div>
          ) : (
            <div className="flex w-56 md:w-72 lg:w-96  items-center justify-between">
              <ThemeSwitch />

              <Button as={Link} href="/auth/registro">
                Registrate
              </Button>
              <Button className="bg-indigo-700" href="/auth/login" as={Link}>
                Inicia Sesión
              </Button>
            </div>
            // <Dropdown options={authOptions}>
            //   <p className="bg-violet-600 text-white p-3 font-bold rounded-md">
            //     Quiero comprar
            //   </p>
            // </Dropdown>
          )}
        </nav>
      </header>
    </>
  );
}
