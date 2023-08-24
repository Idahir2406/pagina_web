import { useState } from "react";
import ProfileLayout from "components/profileLayout";
import { Input } from "@nextui-org/react";
import { useUser } from "hooks/useUser";
import { detectCreditCardType } from "services/functions";
import { BsCreditCard, BsPerson, BsCalendar2Date } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
export default function Payment() {
  const { user, getUser, Loading } = useUser();
  const [cardType, setCardType] = useState("");
  const [cardInfo, setCardInfo] = useState({
    name: "",
    number: "",
    cvv: "",
    date: "",
    type: "",
    brand: "",
  });
  const [icon, setIcon] = useState(null);
  const handleChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardType = async (cardType) => {
    switch (cardType) {
      case "visa":
        const LiaCcVisa = await import("react-icons/lia").then((mod) => mod.LiaCcVisa);
        return setIcon(<LiaCcVisa size={20} />);
      case "mastercard":
        const LiaCcMastercard = await import("react-icons/lia").then((mod) => mod.RiMastercardLine);
        return setIcon(<LiaCcMastercard size={20} />);
      case "amex":
        const LiaCcAmex = await import("react-icons/lia").then((mod) => mod.LiaCcAmex);
        return setIcon(<LiaCcAmex size={20} />);
      case "discover":
        const LiaCcDiscover = await import("react-icons/lia").then((mod) => mod.LiaCcDiscover);
        return setIcon(<LiaCcDiscover size={20} />);
      case "dinersclub":
        const LiaCcDinersClub = await import("react-icons/lia").then((mod) => mod.LiaCcDinersClub);
        return setIcon(<LiaCcDinersClub size={20} />);
      default:
        return "unknown";
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl ml-4 font-medium">Métodos de Pago</h1>
      <div className="w-full flex gap-5 flex-wrap">
        <Input
          onChange={handleChange}
          name="name"
          startContent={<BsPerson size={20} />}
          label="Nombre de tarjeta"
          placeholder="Irving Idahir Pincay Reyes"
          classNames={{
            inputWrapper: [
              "bg-white",
              "dark:bg-gray-800",
              "dark:hover:bg-gray-900",
            ],
          }}
        />
        <Input
        classNames={{
          inputWrapper: [
            "bg-white",
            "dark:bg-gray-800",
            "dark:hover:bg-gray-900",
          ],
        }}
          onBlur={(e) => {
            handleCardType(detectCreditCardType(e.target.value));
          }}
          onChange={(e)=>{
            handleChange(e)

          }}
          name="number"
          startContent={!cardType ? <BsCreditCard size={20} /> : icon}
          label="Número de tarjeta"
          placeholder="0000 0000 0000 0000"
        />
        <div className="flex gap-4 w-full">
        <Input
        classNames={{
          inputWrapper: [
            "bg-white",
            "dark:bg-gray-800",
            "dark:hover:bg-gray-900",
          ],
        }}
         maxLength={3}
          onChange={handleChange}
          name="cvv"
          startContent={<FiLock size={20} />}
          label="Código de seguridad"
          placeholder="000"
        />
        <Input
        classNames={{
          inputWrapper: [
            "bg-white",
            "dark:bg-gray-800",
            "dark:hover:bg-gray-900",
          ],
        }}
          maxLength={5}
          onChange={handleChange}
          name="date"
          startContent={<BsCalendar2Date size={20} />}
          label="Fecha de expiración"
          placeholder="MM/AA"
               />
        </div>
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
