
export const IconButton = ({ children, size,...rest }) => {
  return (
    <button className="hover:bg-white rounded-full p-2 transition-colors dark:hover:bg-slate-600" {...rest}>
      {children}
    </button>
  );
};