export const SocialContainer = ({children}) => {
  return <div className="">{children}</div>;
};

export const Social = ({ children }) => {
  return <div className="flex justify-between items-center border rounded-md p-4">{children}</div>;
}

export const SocialButton = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="hover:bg-slate-200 rounded-full p-2 transition cursor-pointer"
    >
      {children}
    </div>
  );
};

