import { useState } from "react";
import ProfileLayout from "components/profileLayout";
import { ProfileCard } from "components/littleComponents/profileCard";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import {
  AddButton,
  AddCard,
  BankCard,
} from "../../../components/littleComponents/payCards";
export default function Payment({ PaymentData }) {
  const [paymentMethods, setPaymentMethods] = useState(PaymentData);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl ml-4 font-medium">Métodos de Pago</h1>
      <div className="w-full flex gap-5 flex-wrap">
        {paymentMethods.map((payment, index) => (
          <div key={index}>
            <BankCard
              name={payment.name}
              date={payment.date}
              cvv={payment.cvv}
              type={payment.type}
              brand={payment.brand}
              cardNumber={payment.number}
            />
          </div>
        ))}
        <AddButton />

        <AddCard />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  const res = await fetch(
    `http://localhost:3000/api/user/${session.user.email}`
  );
  const userData = await res.json();
  const PaymentData = userData.paymentMethods;
  return {
    props: {
      PaymentData,
    },
  };
}

Payment.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
