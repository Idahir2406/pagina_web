import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
export default function Incrementador({ onChange }) {
  const [value, setValue] = useState(1);

  const increment = () => {
    if (value < 9) {
      setValue((prevValue) => prevValue + 1);
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  return (
    <div className="flex gap-2">
      <Button isIconOnly onPress={decrement}>
        <HiMinusSm size={18} />
      </Button>
      <Input
        variant="faded"
        className="w-16"
        onChange={onChange}
        type="number"
        value={value}
        min="1"
        max="10" // Establecemos el límite máximo a 10
      />

      <Button isIconOnly onPress={increment}>
        <HiOutlinePlusSm size={18} />
      </Button>
    </div>
  );
}
