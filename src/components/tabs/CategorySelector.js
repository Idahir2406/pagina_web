import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
import { useMemo } from "react";
import { categories } from "./tabsOptions";
export const CategorySelector = ({setSelected,selected,onChange,name}) => {

  

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <Dropdown>
      <DropdownTrigger >
        <Input name={name} value={selectedValue} onChange={onChange} labelPlacement="outside" className="w-56 md:w-44 cursor-pointer"/>
        {/* <Button variant="bordered" className="capitalize w-44">
          {selectedValue}
          
        </Button> */}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection actions"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        {categories.map(({key,name}) => (
          <DropdownItem key={name}>{name}</DropdownItem>
        ))}
        
      </DropdownMenu>
    </Dropdown>
  );
};
