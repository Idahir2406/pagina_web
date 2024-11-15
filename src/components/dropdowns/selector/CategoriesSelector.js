import { Select, SelectItem } from "@nextui-org/react";
import { categories } from "../../../context/types";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export const CategoriesSelector = () => {
  const router = useRouter();
  // console.log(router.query.category.toString())
  const [value, setValue] = useState(
    router.query.category || "1"
  );
  const handleSelectionChange = (e) => {
    const selectedCategory = e.target.value;
    setValue(selectedCategory);
    // Obtener los parámetros actuales de la URL
    const { price } = router.query;
    const currentPath = router.pathname;
  
    // Construir los nuevos parámetros de la URL
    const params = new URLSearchParams();
    
    // Agregar la categoría seleccionada
    params.set('category', selectedCategory);
  
    // Si hay un parámetro de price, agregarlo también
    if (price) {
      params.set('price', price);
    }
  
    // Redirigir a la nueva URL con los parámetros actualizados
    router.push(`${currentPath}?${params.toString()}`);
  };

  useEffect(() => {
    setValue(router.query.category || "1");
  }
  , [router.query.category]);

  return (
    <>
    
      <Select
        selectorIcon={
          <HiOutlineChevronDown className="border bg-black p-2 " size={10} />
        }
        radius="full"
        className="max-w-64"
        classNames={{
          trigger:"p-8",
          value:"font-semibold text-sm"
        }}
        label="Categoría"
        onChange={handleSelectionChange}
        selectedKeys={[value]}
        items={categories}
      >
        {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
      </Select>
    </>
  );
};
