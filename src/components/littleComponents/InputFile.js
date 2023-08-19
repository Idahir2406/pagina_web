import { useRef } from "react";

export const InputFile = ({children,onChange,className,...rest}) => {
  const fileInput = useRef(null);

  const openFileInput = () => {
    fileInput.current.click();
  }

  return (
    <div
      onClick={openFileInput}
      className={className}
    >
      {children}
      <input
        {...rest}
        type="file"
        className="hidden"
        onChange={onChange}
        ref={fileInput}
      />
    </div>
  );
};
