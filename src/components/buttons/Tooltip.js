import { Tooltip as Tool, Button } from "@nextui-org/react";

export const Tooltip = ({ children, ...rest }) => {
  return (
    <Tool
      {...rest}
      delay={500}
      
    >
      <Button variant="bordered" isIconOnly>{children}</Button>
    </Tool>
  );
};
