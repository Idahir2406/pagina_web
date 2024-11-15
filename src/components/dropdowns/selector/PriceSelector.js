import { Select, SelectItem } from "@nextui-org/react";
import { pricesRage } from "../../../context/types";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export const PriceSelector = () => {
  const router = useRouter();
  // console.log(router.query.category.toString())
  const [value, setValue] = useState(router.query.price || "1");

  const handleSelectionChange = (e) => {
    const selectedPrice = e.target.value;
    setValue(selectedPrice);
    // Obtener los parámetros actuales de la URL
    const { category } = router.query;
    const currentPath = router.pathname;

    // Construir los nuevos parámetros de la URL
    const params = new URLSearchParams();

    // Agregar la categoría seleccionada
    params.set("price", selectedPrice);

    // Si hay un parámetro de price, agregarlo también
    if (category) {
      params.set("category", category);
    }

    // Redirigir a la nueva URL con los parámetros actualizados
    router.push(`${currentPath}?${params.toString()}`);
  };

  useEffect(() => {
    setValue(router.query.price || "1");
  }, [router.query.price]);

  return (
    <>
      <Select
        selectorIcon={
          <HiOutlineChevronDown className="border bg-black p-2 " size={10} />
        }
        radius="full"
        className="max-w-64"
        classNames={{
          trigger: "p-8",
          value: "font-semibold text-sm",
        }}
        label="Precio"
        onChange={handleSelectionChange}
        selectedKeys={[value]}
        items={pricesRage}
      >
        {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
      </Select>
    </>
  );
};
