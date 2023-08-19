export const IconButton = ({ children, size,...rest }) => {
  return (
    <div {...rest} className="rounded-full p-3  dark:text-gray-200 dark:hover:bg-slate-600 hover:bg-gray-100 transition-all cursor-pointer">
      {children}
    </div>
  );
};