import styles from "./form.module.css";
import { useState, useEffect, useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoMdAlert } from "react-icons/io";
import { phoneCodes } from "utils/phoneCodes";
import { Selector } from "./littleComponents/selector";
export const FormContainer = ({ children }) => {
  return <div className="flex items-center justify-center h-[70vh]">{children}</div>;
};

export const Input = (
  ({
    name,
    label,
    onChange,
    icon,
    type,
    defaultValue,
    required,
    alertMessage,
    MaxLength,
    onMouseLeave,
    onMouseEnter,
    onFocus,
    onBlur,
    textArea,
  }) => {
    const [focus, setFocus] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
      if (defaultValue !== undefined && defaultValue.length > 0) {
        return setFocus(true);
      }
      setFocus(false);
    }, []);

    const handleClick = () => {
      if (!focus) inputRef.current?.focus();
    };

    const handleValidation = (e) => {
      const value = e.target.value;

      switch (type) {
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isValidEmail = emailRegex.test(value);

          setIsValidated(isValidEmail);
          setMessage("");
          if (!isValidEmail && value !== "" && value !== undefined) {
            setMessage("El email que ingresaste no es válido");
            setError(true);
          } else setError(false);
          break;

        case "password":
          setMessage("");
          const passwordRegex = /^(?=.*\d).{6,}$/;
          const isValidPassword = passwordRegex.test(value);
          setIsValidated(isValidPassword);
          setMessage("");
          if (!isValidPassword && value !== "" && value !== undefined) {
            setMessage(
              "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
            );
            setError(true);
          } else setError(false);

          break;

        case "text":
          setMessage("");
          if (value.length === 0) return;
          const textRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
          const isValidText = textRegex.test(value);
          setIsValidated(isValidText);
          setMessage("");
          break;

        case "number":
          setMessage("");
          if (value.length === 0) return;
          const numberRegex = /^[0-9]{1,40}$/;
          const isValidNumber = numberRegex.test(value);
          setIsValidated(isValidNumber);
          setMessage("");
          break;

        default:
          setIsValidated(true); // Si no se especifica un tipo de validación, se considera válido por defecto
          setError(false);
          break;
      }
    };

    return (
      <>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={handleClick}
          className={`w-full md:w-auto cursor-text flex items-center justify-between md:justify-normal rounded-md p-2 h-16 transition-all lg:w-auto md:h-16 ${
            focus
              ? "bg-white dark:bg-slate-800 ring-violet-200 ring-2"
              : "bg-gray-100 dark:bg-slate-700"
          }`}
        >
          {icon && (
            <div className="h-full w-12 flex items-center justify-center">
              {icon}
            </div>
          )}
          <div className="flex flex-col justify-center ml-1 md:ml-2">
            <label
              className={`select-none relative cursor-text w-fit z-10 text-lg md:font-light md:text-sm transition-all transform-gpu ${
                focus
                  ? "text-gray-700 dark:text-gray-200 text-sm"
                  : "text-gray-400 translate-y-3 "
              }`}
            >
              {label}
            </label>

            {textArea ? (
              <textarea
                ref={inputRef}
                name={name}
                required={required}
                defaultValue={defaultValue}
                maxLength={MaxLength}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setFocus(false);
                  }
                  handleValidation(e);
                }}
                onChange={onChange}
                className={`bg-transparent w-52 md:w-full outline-none z-20 ${
                  type === "password" && "text-gray-700"
                }`}
              />
            ) : (
              <input
                ref={inputRef}
                name={name}
                required={required}
                defaultValue={defaultValue}
                type={type}
                maxLength={MaxLength}
                onFocus={() => {
                  setFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setFocus(false);
                  }
                  handleValidation(e);
                }}
                onChange={onChange}
                className={`bg-transparent w-52 md:w-full outline-none z-20 ${
                  type === "password" && "text-gray-700"
                }`}
              />
            )}
          </div>
          <div className="flex items-center justify-center h-8 w-8">
            <AiFillCheckCircle
              className={`transition-all text-green-500 ${
                isValidated ? "block" : "hidden"
              }`}
              size={20}
            />
            {!isValidated && error && (
              <div
                className={`group relative ${
                  !isValidated && error ? "block " : "hidden"
                }`}
              >
                <IoMdAlert className={`text-red-500 ml-auto`} size={20} />
              </div>
            )}
          </div>
        </div>
        <p className="text-red-500 text-sm md:max-w-xs">
          {message}
          {alertMessage}
        </p>
      </>
    );
  }
);

export const PhoneInput = (
  ({
    name,
    label,
    onChange,
    icon,
    defaultValue,
    required,
    alertMessage,
    rotate,
    onMouseLeave,
    onMouseEnter,
    onFocus,
    onBlur,
    value,
    selectedCode,
    setSelectedCode,
  }) => {
    const [focus, setFocus] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    const handleClick = () => {
      if (!focus) inputRef.current?.focus();
    };

    const handleValidation = (e) => {
      const value = e.target.value;
      // Add your validation logic here
    };

    return (
      <>
        <div
          onMouseEnter={onMouseEnter}
          onClick={handleClick}
          onMouseLeave={onMouseLeave}
          className={`w-full md:w-auto cursor-text flex items-center justify-between rounded-md p-2 transition-all lg:w-80 ${
            focus ? "bg-white ring-2" : "bg-gray-100"
          }`}
        >
          <Selector
            selected={selectedCode}
            setSelected={setSelectedCode}
            options={phoneCodes}
          />
          <div className="flex flex-col justify-center ml-1 md:ml-2">
            <label
              className={`relative cursor-text w-fit font-light z-10 text-md transition-all ${
                focus ? "text-gray-700 top-0" : "text-gray-400 top-3"
              }`}
            >
              {label}
            </label>
            <input
              ref={inputRef}
              name={name}
              required={required}
              defaultValue={defaultValue}
              value={value}
              type="number"
              onFocus={() => {
                setFocus(true);
                onFocus();
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setFocus(false);
                  onBlur();
                }
                handleValidation(e);
              }}
              onChange={onChange}
              className="bg-transparent w-36 md:w-auto outline-none z-20"
            />
          </div>
          <div className="flex items-center justify-center h-8 w-8">
            <AiFillCheckCircle
              className={`transition-all text-green-500 ${
                isValidated ? "block" : "hidden"
              }`}
              size={20}
            />
            {!isValidated && error && (
              <div
                className={`group relative ${
                  !isValidated && error ? "block " : "hidden"
                }`}
              >
                <IoMdAlert className={`text-red-500 ml-auto`} size={20} />
              </div>
            )}
          </div>
        </div>
        <p className="text-red-500 text-sm md:max-w-xs">
          {message}
          {alertMessage}
        </p>
      </>
    );
  }
);


export const Button = ({ label, onClick,type }) => {
  return (
    <button type={type} onClick={onClick} className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-2 rounded-md transition">
      {label}
    </button>
  );
};

export const Form=({children,onSubmit})=>{
  return <form className="rounded-md p-5 flex flex-col gap-3 justify-center bg-white dark:bg-slate-800" onSubmit={onSubmit}>{children}</form>
}
