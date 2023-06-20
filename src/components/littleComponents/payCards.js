import { ProfileCard } from "components/littleComponents/profileCard";
import { useState } from "react";
import { RiVisaLine } from "react-icons/ri";
import { SiMastercard } from "react-icons/si";
import { RxPlusCircled } from "react-icons/rx";
import { EditInput } from "./editInput";
import { Selector } from "./selector";
import { Button } from "./button";
import { Modal } from "./modal";

export const BankCard = ({ name, date, cvv, type, brand, cardNumber }) => {
  const brandIcons = {
    Visa: RiVisaLine,
    MasterCard: SiMastercard,
    // Agrega más marcas de tarjetas aquí si es necesario
  };

  const IconComponent = brandIcons[brand];

  return (
    <ProfileCard className="w-auto shadow-md">
      <div className="flex justify-between items-center gap-4 h-auto">
        <p className="text-black font-semibold">{name}</p>
        {IconComponent && <IconComponent size={30} className="text-gray-60" />}
      </div>

      <p className="text-black font-regular">{cardNumber}</p>
      <p className="text-black font-semibold">{date}</p>
      <div className="flex justify-between items-center">
        <p className="text-black font-regular">{cvv}</p>
        <p>{type}</p>
      </div>
    </ProfileCard>
  );
};

export const AddButton = () => {
  return (
    <ProfileCard className="w-auto flex items-center justify-center shadow-md">
      <div className="flex flex-col items-center justify-center gap-4 h-auto">
        <p className="text-black font-semibold">Agregar Tarjeta</p>
        <RxPlusCircled size={50} className="text-gray-60 cursor-pointer" />
      </div>
    </ProfileCard>
  );
};

export const AddCard = () => {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2021");
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    cvv: "",
    date: "",
    type: "",
    brand: "",
  });
  const [isOpen, setIsOpen] = useState(false)

  const handleCvv = (e) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, ""); // Elimina cualquier carácter no numérico

    setCardInfo({ ...cardInfo, cvv: digitsOnly.slice(0, 3) });
  };

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const years = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"];
  return (
    <ProfileCard className="w-auto flex items-start justify-start shadow-md">
      <div className="flex flex-col items-start justify-center gap-4 h-auto">
        <EditInput placeholder="Nombre de la tarjeta" />
        <EditInput type="number" placeholder="Número de la tarjeta" />
        <div className="flex gap-2 justify-start w-full">
          <Selector
            options={months}
            selected={selectedMonth}
            setSelected={setSelectedMonth}
          />
          <Selector
            options={years}
            selected={selectedYear}
            setSelected={setSelectedYear}
          />
        </div>
        <EditInput
          maxLength={3}
          onChange={handleCvv}
          type="number"
          placeholder="CVV"
          className="w-20"
        />
      </div>
      <div className="flex justify-between">
        <Button className="mt-4">Agregar</Button>
        <Button onClick={()=>setIsOpen(!isOpen)} className="mt-4">Cancelar</Button>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </ProfileCard>
  );
};

export const PayPal = () => {
  return (
    <>
      <p className="text-black font-regular">{número}</p>
      <p className="text-black font-regular">{correo_electrónico}</p>
    </>
  );
};
