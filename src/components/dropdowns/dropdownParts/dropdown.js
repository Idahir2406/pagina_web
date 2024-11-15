import {
  Dropdown as Drp,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { HiOutlineUser } from "react-icons/hi2";
const Dropdown = ({ options, children }) => {
  return (
    <Drp placement="bottom-end">
      <DropdownTrigger>
        <Button startContent={
          <HiOutlineUser />
        } className="bg-black text-white">{children}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Auth Actions">
        {options.map((option, index) => (
          <DropdownItem  as={Link} key={index} href={option.href} >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Drp>
  );
};

export default Dropdown;
