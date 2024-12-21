//icons imports
import { Searchbox } from "./searchbox";
import { NavLink } from "./littleComponents/navLink";
import dynamic from "next/dynamic";
import { useUser } from "../hooks/useUser";
import { DropdownItem } from "@nextui-org/react";
import ThemeSwitch from "./littleComponents/ThemeSwitch";
import { useLogContext } from "../hooks/useIsLoggedIn";
import { authOptions, profileOptions } from "../services/constants";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from "react";
const AuthDropdown = dynamic(() =>
  import("./dropdowns/dropdownParts/dropdown")
);
import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
const DynamicLink = dynamic(() => import("next/link"));
const Dropdown = dynamic(
  import("./dropdowns/ProfileDropdown").then((mod) => mod.ProfileDropdown)
);
import { useRouter } from "next/router";

export default function Nav() {
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


  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    //
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="bg-[#e5e5e5] dark:bg-slate-700"
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[2px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-black",
          ],
        }}
      >
        <NavbarContent justify="start">
          <NavbarBrand>
            <DynamicLink className="flex flex-col ml-10" href="/">
              <p className="text-xl font-medium dark:text-white">Christmas</p>
              <p className="text-xl font-medium dark:text-white">STORE</p>
            </DynamicLink>
          </NavbarBrand>
          <NavbarMenuToggle
            className="sm:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent
          className="sm:hidden pr-3"
          justify="center"
        ></NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem
            isActive={
              router.pathname === "/user/cart" ||
              router.pathname === "/user/cart/[id]"
            }
          >
            <DynamicLink
              href="/user/cart"
              className="hidden md:block dark:text-white dark:hover:text-gray-200"
            >
              Carrito
            </DynamicLink>
          </NavbarItem>
          <NavbarItem isActive={router.pathname === "/user/orders"}>
            <DynamicLink
              className="hidden md:block dark:text-white dark:hover:text-gray-200"
              href="/user/orders"
            >
              Pedidos
            </DynamicLink>
          </NavbarItem>
          <NavbarItem>
            <DynamicLink
              href="/user/wishList"
              className="hidden md:block dark:text-white dark:hover:text-gray-200"
            >
              Favoritos
            </DynamicLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {!isLogged ? (
            <NavbarItem className="hidden lg:flex gap-2">
              <ThemeSwitch />
              <AuthDropdown options={authOptions}>Comienza ahora</AuthDropdown>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Dropdown
                src={!Loading && user && user.avatar}
                username={!Loading && user && user.username}
                options={profileOptions}
                role={!Loading && user && user.role}
              >
                <DropdownItem
                  color="danger"
                  className="text-danger"
                  startContent={<HiOutlineLogout size={18} />}
                  key="logout"
                  onPress={handleLogout}
                >
                  Cerrar Sesión
                </DropdownItem>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <DynamicLink
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </DynamicLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      {/* <header className="w-full dark:bg-slate-800 bg-white shadow-sm sticky top-0 z-50 opacity-95">
        <nav className="flex py-5 w-[92%] justify-between items-center mx-auto">
          <div className="flex gap-6 justify-center items-center">
            <NavLink href="/">
              <p className="text-xl font-medium dark:text-white">Christmas</p>
              <p className="text-xl font-medium dark:text-white">STORE</p>
            </NavLink>
          </div>

          {isLogged ? (
            <div className="flex items-center justify-between gap-4 md:gap-16">
              
             
              <ThemeSwitch />

              <div className="flex gap-1 items-center justify-between">
                <Dropdown
                  src={!Loading && user && user.avatar}
                  username={!Loading && user && user.username}
                  options={profileOptions}
                  role={!Loading && user && user.role}
                >
                  <DropdownItem
                    color="danger"
                    className="text-danger"
                    startContent={<HiOutlineLogout size={18} />}
                    key="logout"
                    onPress={handleLogout}
                  >
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
      </header> */}
    </>
  );
}
