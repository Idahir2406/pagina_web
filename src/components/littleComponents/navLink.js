import React from "react";
import Link from "next/link";

export const NavLink = ({ href, children }) => {
  return (
    <Link className="hover:text-gray-500" href={href}>
      {children}
    </Link>
  );
};
