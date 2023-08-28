import { useState } from "react";
import ProfileLayout from "components/profileLayout";
import { Input } from "@nextui-org/react";
import { useUser } from "hooks/useUser";
import { detectCreditCardType } from "services/functions";
import { BsCreditCard, BsPerson, BsCalendar2Date } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { MethodArccordion } from "components/dropdowns/MethodArccordion";
import Popover from "components/buttons/Popover";
import { CurrentDate } from "services/constants";
export default function Payment() {
  const { user, updateUser } = useUser();
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    cvv: "",
    date: "",
    type: "",
    brand: "",
  });
  const [icon, setIcon] = useState(null);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardType = async (cardType) => {
    switch (cardType) {
      case "visa":
        const LiaCcVisa = await import("react-icons/lia").then(
          (mod) => mod.LiaCcVisa
        );
        setCardInfo({ ...cardInfo, type: "credit", brand: "visa" });
        return setIcon(<LiaCcVisa size={20} />);
      case "mastercard":
        const LiaCcMastercard = await import("react-icons/lia").then(
          (mod) => mod.RiMastercardLine
        );
        setCardInfo({ ...cardInfo, type: "credit", brand: "mastercard" });
        return setIcon(<LiaCcMastercard size={20} />);
      case "amex":
        const LiaCcAmex = await import("react-icons/lia").then(
          (mod) => mod.LiaCcAmex
        );
        setCardInfo({ ...cardInfo, type: "credit", brand: "amex" });
        return setIcon(<LiaCcAmex size={20} />);
      case "discover":
        const LiaCcDiscover = await import("react-icons/lia").then(
          (mod) => mod.LiaCcDiscover
        );
        setCardInfo({ ...cardInfo, type: "credit", brand: "discover" });
        return setIcon(<LiaCcDiscover size={20} />);
      case "dinersclub":
        const LiaCcDinersClub = await import("react-icons/lia").then(
          (mod) => mod.LiaCcDinersClub
        );
        setCardInfo({ ...cardInfo, type: "credit", brand: "dinersclub" });
        return setIcon(<LiaCcDinersClub size={20} />);
      default:
        setIcon(<BsCreditCard size={20} />);
        return "unknown";
    }
  };

  const validateCard = () => {
    if (
      cardInfo.name === "" ||
      cardInfo.number === "" ||
      cardInfo.cvv === "" ||
      cardInfo.date === ""
    )
      return false;

    if (
      cardInfo.number.length < 16 ||
      cardInfo.cvv.length < 3 ||
      cardInfo.date.length < 5
    )
      return false;
    if (cardInfo.brand === "" || cardInfo.type === "") return false;
    if (cardInfo.name.length < 5) return false;
    if (
      cardInfo.date.slice(0, 2) > 12 ||
      cardInfo.date.slice(3, 5) < CurrentDate.slice(2, 4)
    )
      return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const isValid = validateCard();
      if(!isValid) return setMessage("Datos incorrectos");
      const res = await fetch(`/api/user/paymentMethods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardInfo),
      });

      const data = await res.json();
      console.log(data);
      updateUser({ paymentMethods: data.paymentMethods });

      setMessage("Método de pago agregado");
      setCardInfo({
        name: "",
        number: "",
        cvv: "",
        date: "",
        type: "",
        brand: "",

      });

    } catch (error) {
      console.log(error);
    }
  };

  const formatExpiry = (input) => {
    let value = input.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setCardInfo({
      ...cardInfo,
      date: value,
    });
  };

  return (

      <div className="grid md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="flex gap-5 flex-wrap bg-white rounded-md p-4 dark:bg-slate-800 max-w-lg max-h-80"
        >
          <Input
            onChange={handleChange}
            name="name"
            value={cardInfo.name}
            startContent={<BsPerson size={20} />}
            label="Nombre de tarjeta"
            placeholder="Irving Idahir Pincay Reyes"
          />
          <Input
            onBlur={(e) => handleCardType(detectCreditCardType(e.target.value))}
            type="text"
            value={cardInfo.number}
            onChange={handleChange}
            name="number"
            startContent={icon}
            label="Número de tarjeta"
            placeholder="0000 0000 0000 0000"
          />
          <div className="flex gap-4 w-full">
            <Input
              value={cardInfo.cvv}
              maxLength={3}
              onChange={handleChange}
              name="cvv"
              startContent={<FiLock size={20} />}
              label="Código de seguridad"
              placeholder="000"
            />
            <Input
              maxLength={5}
              onChange={(e) => {
                formatExpiry(e.target.value);
              }}
              name="date"
              value={cardInfo.date}
              startContent={<BsCalendar2Date size={20} />}
              label="Fecha de expiración"
              placeholder="MM/AA"
            />
          </div>

          <Popover
            message={message}
            type="submit"
            className="w-full bg-indigo-600 text-white"
          >
            Agregar
          </Popover>
        </form>
        <div>
          <MethodArccordion user={user} />
        </div>
      </div>

  );
}

// export async function getServerSideProps(ctx) {
//   const session = await getServerSession(ctx.req, ctx.res, authOptions);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }
//   const res = await fetch(
//     `/api/user/${session.user.email}`
//   );
//   const userData = await res.json();
//   const PaymentData = userData.paymentMethods;
//   return {
//     props: {
//       PaymentData,
//     },
//   };
// }

Payment.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
