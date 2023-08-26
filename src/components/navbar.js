
//icons imports
import { Searchbox } from "./searchbox";
import { NavLink } from "./littleComponents/navLink";
import dynamic from "next/dynamic";
import { useUser } from "../hooks/useUser";
import { DropdownItem } from "@nextui-org/react";
import ThemeSwitch from "./littleComponents/ThemeSwitch";
import { useLogContext } from "../hooks/useIsLoggedIn";
import { authOptions,profileOptions  } from "../services/constants";
const AuthDropdown = dynamic(() =>
  import("./dropdowns/dropdownParts/dropdown")
);
const DynamicLink = dynamic(() => import("next/link"));
const Dropdown = dynamic(
  import("./dropdowns/ProfileDropdown").then((mod) => mod.ProfileDropdown)
);
import { useRouter } from "next/router";


export default function Navbar() {
  const { user, deleteUser, Loading } = useUser();
  const { isLogged, logout } = useLogContext();
  const router = useRouter();
  const handleLogout = async () => {
    const signOut = await import("next-auth/react").then((mod) => mod.signOut);
    signOut({ redirect: false });
    router.push("/");
    logout();
    deleteUser();
  };

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
                  src={!Loading && user && user.avatar}
                  username={!Loading && user && user.username}
                  options={profileOptions}
                  role={!Loading && user && user.role}
                >
                  <DropdownItem key="logout" onPress={handleLogout}>
                    Cerrar Sesión
                  </DropdownItem>
                </Dropdown>

              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-8">
              <ThemeSwitch />
              <AuthDropdown options={authOptions}>Comienza ahora</AuthDropdown>

            </div>
          )}
        </nav>
      </header>
    </>
  );
}
