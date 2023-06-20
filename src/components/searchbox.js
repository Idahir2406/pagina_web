import React, { Fragment,useContext,useState } from "react";
import { SearchContext } from "../context/searchContext";
import { Listbox } from "@headlessui/react";
import { BsChevronCompactDown } from "react-icons/bs";
import { TransitionComponent } from "./littleComponents/transitionComponent";
export const Searchbox = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const categories = [
    { id: 1, name: "Todos", link: "/products" },
    { id: 2, name: "Regalos", link: "/products?category=regalos" },
    { id: 3, name: "Decoración", link: "/products?category=decoracion" },
    { id: 4, name: "Árboles", link: "/products?category=arboles" },
    { id: 5, name: "Luces", link: "/products?category=luces" },
    { id: 6, name: "Adornos", link: "/products?category=adornos" },
    { id: 7, name: "Envolturas", link: "/products?category=envolturas" },
    { id: 8, name: "Accesorios", link: "/products?category=accesorios" },
    { id: 9, name: "Ropa", link: "/products?category=ropa" },
    { id: 10, name: "Calzado", link: "/products?category=calzado" },
  ];
  
  const [selectedCategorie, setSelectedCategorie] = useState(categories[0]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`hidden md:flex p-1 transition justify-center items-center border ${
      !isFocused ? 'bg-gray-100' : ''
    } border-gray-1 rounded-lg`}>
      <Listbox
        as="div"
        className=" relative inline-block text-left"
        value={selectedCategorie}
        onChange={setSelectedCategorie}
      >
        {({ open }) => (
          <>
            <Listbox.Button className="flex items-center gap-2 bg-violet-600 text-white p-2 rounded-lg transition-all">
              {selectedCategorie.name}
              <BsChevronCompactDown
                className={`transition-all ${open && "rotate-180"}`}
                size={15}
              />
            </Listbox.Button>

            <TransitionComponent
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Listbox.Options className="absolute w-56 mt-2 origin-top-right bg-white divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {categories.map((categorie) => (
                  <div key={categorie.id} className="px-1 py-1">
                    <Listbox.Option
                      className="bg-white text-black hover:bg-violet-500 hover:text-white
                   group flex rounded-md cursor-pointer items-center w-full p-2 text-sm"
                      key={categorie.link}
                      value={categorie}
                    >
                      {categorie.name}
                    </Listbox.Option>
                  </div>
                ))}
              </Listbox.Options>
            </TransitionComponent>
          </>
        )}
      </Listbox>
      <input
        type="text"
        placeholder="Buscar"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleChange}
        className="ml-3 outline-none border-none bg-transparent focus:text-gray-700 text-gray-500 placeholder-gray-500"
      />
    </div>
  );
};
