export const ProfileCard = ({children,className}) => {
  return (
    <div className={`flex flex-col bg-gray-100 rounded-md p-5 max-w-sm gap-1 ${className}`}>
      {children}
    </div>
  )
}
