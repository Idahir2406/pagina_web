import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar
} from "@nextui-org/react";

import Link from "next/link";
import { Admin } from "../../services/constants";
import dynamic from "next/dynamic";

const DynamicLink = dynamic(() => import("next/link"));
const DynamicDropdownItem = dynamic(() => import("@nextui-org/react").then((mod) => mod.DropdownItem),{
  ssr: false,
});
export const ProfileDropdown = ({ src, role, children, username }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar

          src={src}
          showFallback
          name={username}
          isBordered
          className="cursor-pointer object-cover"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {role === Admin && (
          <DropdownSection aria-label="Admin Options" showDivider>
            <DropdownItem
              isReadOnly
              textValue="hola"
              key="profile"
              className="h-14 gap-2"
            >
              <div>
                <p className="font-semibold">Bienvenido</p>
                <p className="font-semibold">@{username}</p>
              </div>
            </DropdownItem>
            <DropdownItem as={Link} href="/admin/dashboard" key="dashboard">
              Dashboard
            </DropdownItem>
            <DropdownItem
              as={Link}
              href="/admin/productManagement"
              key="products"
            >
              Gestionar Productos
            </DropdownItem>
          </DropdownSection>
        )}
        <DropdownSection
          aria-label="Products"
          className="block md:hidden"
          showDivider
        >
          <DropdownItem  href="/user/cart" key="cart">
            Carrito
          </DropdownItem>
          <DropdownItem  href="/user/orders" key="orders">
            Pedidos
          </DropdownItem>
          <DropdownItem  href="/user/wishList" key="wishList">
            Favoritos
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Profile & Actions">
          <DropdownItem as={Link} href="/user/settings/profile" key="profile">
            Perfil
          </DropdownItem>
          <DropdownItem href="/products/1" key="settings">
            Configuración
          </DropdownItem>
          {children}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
