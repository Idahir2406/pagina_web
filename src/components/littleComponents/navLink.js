import Link from "next/link";

export const NavLink = ({ href, children,className }) => {
  return (
    <Link className={`hover:text-gray-500 ${className}`} href={href}>
      {children}
    </Link>
  );
};
