import { useState } from "react";
import ProfileLayout from "components/profileLayout";
import { ProfileCard } from "components/littleComponents/profileCard";
import { useUser } from "hooks/useUser";
import {
  AddButton,
  AddCard,
  BankCard,
} from "../../../components/littleComponents/payCards";
export default function Payment() {
  const { user, getUser, Loading } = useUser();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl ml-4 font-medium">Métodos de Pago</h1>
      {!Loading && (
        <div className="w-full flex gap-5 flex-wrap">
          {user.paymentMethods.map((payment, index) => (
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
      )}
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
