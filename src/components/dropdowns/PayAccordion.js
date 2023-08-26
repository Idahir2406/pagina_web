import { Accordion } from "./Accordion";
import { RadioGroup, Radio } from "@nextui-org/react";
import Link from "next/link";
export const PayAccordion = ({
  paymentMethods,
  setSelected,
  selected,
  addresses,
}) => {
  const PayOptions = [
    {
      title: "Método de pago",
      content:
        paymentMethods.length !== 0 ? (
          <RadioGroup
            onValueChange={(e) => {
              setSelected({ ...selected, paymentMethod: e });
            }}
            value={selected.paymentMethod}
            className="flex flex-col gap-4"
          >
            {paymentMethods.map((method, index) => (
              <Radio value={method} key={index}>
                <p>{method.name}</p>

                <div className="flex gap-6">
                  <p>{method.brand}</p>-<p>{method.type}</p>
                </div>

                <p>{method.number}</p>
              </Radio>
            ))}
          </RadioGroup>
        ) : (
          <div>
            <p className="font-medium">No hay métodos de pago registrados</p>
            <p>Registra uno en tu <Link className="text-indigo-600 hover:underline" href="/user/settings/payment">perfil</Link></p>
          </div>
        ),
    },
    {
      title: "Dirección de envío",
      content: (
        addresses.length !== 0 ? (
          <RadioGroup
          value={selected.address}
          onValueChange={(e) => {
            setSelected({ ...selected, address: e });
          }}
          className="flex flex-col"
        >
          {addresses.map((address, index) => (
            <Radio value={address} key={index}>
              <p>
                {address.city},{address.state}
              </p>
              <p>{address.street}</p>
              <p>{address.postalCode}</p>
            </Radio>
          ))}
        </RadioGroup>
        ):(
          <div>
            <p className="font-medium">No tienes direcciónes </p>
            <p>Registra una en tu <Link className="text-indigo-600 hover:underline" href="/user/settings/addresses">perfil</Link></p>
          </div>
        )
      ),
    },
  ];

  return <Accordion options={PayOptions} />;
};
