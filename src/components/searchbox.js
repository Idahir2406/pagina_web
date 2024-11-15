import { Fragment,useContext,useState,Suspense,lazy } from "react";
import { SearchContext } from "../context/searchContext";
import { Listbox } from "@headlessui/react";
import { BsChevronCompactDown } from "react-icons/bs";
import { categories } from "../context/types";
export const Searchbox = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };


  const [selectedCategorie, setSelectedCategorie] = useState(categories[0]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`hidden md:flex p-1 transition justify-center items-center border ${
      !isFocused ? 'bg-gray-100 dark:bg-slate-700' : ''
    } border-gray-1 rounded-lg`}>
      <Listbox
        as="div"
        className=" relative inline-block text-left"
        value={selectedCategorie}
        onChange={setSelectedCategorie}
      >
        {({ open }) => (
          <>
            <Listbox.Button className="flex items-center gap-2 bg-violet-600 text-white dark:text-gray-200 p-2 rounded-lg transition-all">
              {selectedCategorie.name}
              <BsChevronCompactDown
                className={`transition-all ${open && "rotate-180"}`}
                size={15}
              />
            </Listbox.Button>


              <Listbox.Options className="absolute w-56 mt-2 origin-top-right dark:bg-slate-800 bg-white divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {categories.map((categorie) => (
                  <div key={categorie.id} className="px-1 py-1">
                    <Listbox.Option
                      className="bg-white dark:text-gray-200 text-black hover:bg-violet-500 hover:dark:bg-slate-700 dark:bg-slate-800 hover:text-white
                   group flex rounded-md cursor-pointer items-center w-full p-2 text-sm"
                      key={categorie.link}
                      value={categorie}
                    >
                      {categorie.name}
                    </Listbox.Option>
                  </div>
                ))}
              </Listbox.Options>

          </>
        )}
      </Listbox>
      <input
        type="text"
        placeholder="Buscar"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleChange}
        className="ml-3 outline-none border-none bg-transparent focus:text-gray-700 dark:text-gray-200 text-gray-500 placeholder-gray-500"
      />
    </div>
  );
};
