import React from "react";
export const IconButton = ({ children, size }) => {
  return (
    <div className="rounded-full p-3 active:text-violet-500 hover:bg-gray-100 transition-all">
      {React.cloneElement(children, { size: size, className: "cursor-pointer" })}
    </div>
  );
};