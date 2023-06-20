
export const Button = ({children,onClick}) => {
  return (
    <button
    onClick={onClick}
    className="rounded-md p-1 bg-violet-600 hover:bg-violet-700 text-white transition-all"
  >
    {children}
  </button>
  )
}
