import React from "react";

export const EditInput = ({onChange,placeholder,name,className,type,maxLength}) => {
  return (
    <input
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`border-2 outline-none border-gray-300 focus:border-gray-400 rounded-md p-1 ${className}`}
      type={type}
      maxLength={maxLength}
    />
  );
};
