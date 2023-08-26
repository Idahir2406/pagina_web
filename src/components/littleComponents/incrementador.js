import { useState } from "react";

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
    <div className="flex  mb-4 h-12 w-1/4 justify-between items-center p-4 border rounded-md">
      <p className="cursor-pointer select-none" onClick={decrement}>
        -
      </p>
      <input
        className="w-6 text-lg text-center outline-none bg-transparent"
        onChange={onChange}
        type="number"
        value={value}
        min="1"
        max="10" // Establecemos el límite máximo a 10
      />
      <p className="cursor-pointer select-none" onClick={increment}>
        +
      </p>
    </div>
  );
}
