import {
  Dropdown as Drp,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
const Dropdown = ({ options, children }) => {
  return (
    <Drp placement="bottom-end">
      <DropdownTrigger>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">{children}</Button>
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
