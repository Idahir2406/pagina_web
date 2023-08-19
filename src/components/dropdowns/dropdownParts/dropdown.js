
import {
  Dropdown as Drp,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";

export const Dropdown = ({ options, children }) => {
  return (
    <Drp placement="bottom-end">
      <DropdownTrigger>
        {children}
      </DropdownTrigger>
      <DropdownMenu>
        {options}
      </DropdownMenu>
    </Drp>
    // <Menu as="div" className="relative inline-block text-left">
    //   {({ open }) => (
    //     <>
    //       {profile ? (
    //         <Menu.Button
    //           className={`flex items-center justify-center w-full text-sm font-medium rounded-full ${
    //             open &&
    //             "outline-none ring-2 ring-violet-500 :ring-offset-1 ring-offset-violet-500"
    //           }`}
    //         >
    //           <div className="">{children}</div>
    //         </Menu.Button>
    //       ) : (
    //         <Menu.Button className="flex items-center justify-center w-full text-sm font-medium rounded-full">
    //           <div className="">{children}</div>
    //         </Menu.Button>
    //       )}

    //       <TransitionComponent show={open}>
    //         <Menu.Items
    //           as={Fragment}
    //           className={`absolute w-56 mt-2 bg-white dark:bg-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
    //             left ? "left-0" : "right-0"
    //           }`}
    //         >
    //           <div className="px-1 py-1">
    //             {options.map((option) => (
    //               <Menu.Item key={option.id} as={Fragment}>
    //                 {({ close }) => (
    //                   <>
    //                     {option.onClick ? (
    //                       <button
    //                         type="button"
    //                         onClick={() => {
    //                           option.onClick();
    //                           close();
    //                         }}
    //                         className="hover:bg-violet-600 dark:text-gray-200 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm"
    //                       >
    //                         {option.icon && option.icon}
    //                         {option.content}
    //                       </button>
    //                     ) : (
    //                       <Link
    //                         key={option.id}
    //                         href={option.link}
    //                         onClick={() => close()}
    //                         className="hover:bg-violet-600 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm"
    //                       >
    //                         {option.icon && option.icon}
    //                         {option.content}
    //                       </Link>
    //                     )}
    //                   </>
    //                 )}
    //               </Menu.Item>
    //             ))}
    //           </div>
    //         </Menu.Items>
    //       </TransitionComponent>
    //     </>
    //   )}
    // </Menu>
  );
};
