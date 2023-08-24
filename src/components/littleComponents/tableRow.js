export const TableRow = ({children}) => {
  return (
    <td className="text-start py-4 px-1">
      <label className="cursor-pointer hover:text-gray-600">
        {children}
      </label>
    </td>
  );
};
