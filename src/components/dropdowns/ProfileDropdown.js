import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar,
} from "@nextui-org/react";

import Link from "next/link";
import { Admin } from "../../services/constants";
import { HiOutlineUser, HiOutlineCog } from "react-icons/hi";
export const ProfileDropdown = ({ src, role, children, username }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src={src}
          showFallback
          color="secondary"
          name={username}
          isBordered
          className="cursor-pointer object-cover"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          isReadOnly
          textValue="hola"
          key="profile"
          className="h-14 gap-2"
        >
          <div>
            <p className="font-semibold text-default-500">Bienvenido</p>
            <p className="font-semibold">@{username}</p>
          </div>
        </DropdownItem>
        {role === Admin && (
          <DropdownSection aria-label="Admin Options" showDivider>
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
          <DropdownItem as={Link} href="/user/cart" key="cart">
            Carrito
          </DropdownItem>
          <DropdownItem as={Link} href="/user/orders" key="orders">
            Pedidos
          </DropdownItem>
          <DropdownItem as={Link} href="/user/wishList" key="wishList">
            Favoritos
          </DropdownItem>
        </DropdownSection>
        <DropdownSection aria-label="Profile & Actions">
          <DropdownItem
            startContent={<HiOutlineUser size={18} />}
            as={Link}
            href="/user/settings/profile"
            key="profile"
          >
            Perfil
          </DropdownItem>
          <DropdownItem
            startContent={<HiOutlineCog size={18} />}
            href="/products/1"
            key="settings"
          >
            Configuración
          </DropdownItem>
          {children}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
