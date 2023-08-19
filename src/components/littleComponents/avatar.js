import { FaUser } from "react-icons/fa";
import { Avatar as AvatarUi, AvatarGroup, AvatarIcon } from "@nextui-org/react";
export default function Avatar({ src, size, noSrc, ...rest }) {
  let avatarSize = "w-8 h-8"; // Tamaño predeterminado

  switch (size) {
    case "sm":
      avatarSize = "w-6 h-6";
      break;
    case "md":
      avatarSize = "w-10 h-10";
      break;
    case "lg":
      avatarSize = "w-16 h-16";
      break;
    case "xl":
      avatarSize = "w-20 h-20";
      break;
    case "2xl":
      avatarSize = "w-24 h-24";
      break;
    case "3xl":
      avatarSize = "w-32 h-32";
    default:
      avatarSize = "w-8 h-8";
  }

  if (noSrc)
    return (
      <FaUser
        className={`p-2 ring ring-gray-500  text-gray-500 rounded-full ${avatarSize}`}
        size={128}
      />
    );

  return <AvatarUi src={src} {...rest} />;
}
