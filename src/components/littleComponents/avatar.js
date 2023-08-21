import { Avatar as AvatarUi, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import Image from "next/image";
export default function Avatar({ src, size,  ...rest }) {

  return <AvatarUi width={125} height={125}  as={Image} src={src} {...rest} />;
}
