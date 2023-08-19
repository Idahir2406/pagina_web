import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

export const Selector = ({ options, selected, setSelected }) => {
  return (
    <Listbox value={selected} onChange={setSelected} as="div">
      <Listbox.Button>
        <div className="flex justify-between items-center rounded-md border border-gray-300 shadow-sm w-12 py-1 px-2">
          <p className="text-sm text-gray-800 dark:text-gray-200">{selected}</p>
          <FiChevronDown className="text-gray-600" size={15} />
        </div>
      </Listbox.Button>

      <Listbox.Options className="absolute mt-2 origin-top-right bg-white dark:bg-slate-800 divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
          {options.map((option, index) => (
            <Listbox.Option
              className="bg-white text-black dark:bg-slate-800 dark:text-gray-200 w-auto px-2 hover:bg-violet-200 hover:text-white
            group flex rounded-md cursor-pointer items-center  p-1 text-sm"
              key={index}
              value={option}
            >
              {option}
            </Listbox.Option>
          ))}
        </div>
      </Listbox.Options>
    </Listbox>
  );
};
