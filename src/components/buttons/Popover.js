import {
  Popover as Pop,
  PopoverTrigger,
  PopoverContent,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
export default function Popover({
  message,
  onPress,
  children,
  type,
  className,
  ...rest
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 6000);
  };

  return (
    <Pop
      isOpen={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        handleClose();
      }}
    >
      <PopoverTrigger>
        <Button
          {...rest}
          type={type}
          className={`bg-violet-500 text-white ${className}`}
          onPress={onPress}
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div>{message ? message : <Spinner size="sm" />}</div>
        </div>
      </PopoverContent>
    </Pop>
  );
}
