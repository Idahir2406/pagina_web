import { Accordion } from "./Accordion";

import { RadioGroup, Radio } from "@nextui-org/react";

export const PayAccordion = ({
  paymentMethods,
  setSelected,
  selected,
  addresses,
}) => {
  const PayOptions = [
    {
      title: "Método de pago",
      content: (
        <RadioGroup
          onValueChange={(e)=>{
            setSelected({...selected,paymentMethod:e})
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
      ),
    },
    {
      title: "Dirección de envío",
      content: (
        <RadioGroup value={selected.address} onValueChange={(e)=>{
          setSelected({...selected,address:e})
        }} className="flex flex-col">
          {addresses.map((address, index) => (
            <Radio value={address} key={index}>
              <p>{address.city},{address.state}</p>
              <p>{address.street}</p>
              <p>{address.postalCode}</p>
            </Radio>
          ))}
        </RadioGroup>
      ),
    },
  ];

  return <Accordion options={PayOptions} />;
};
