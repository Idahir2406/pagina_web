import { Accordion, AccordionItem,Button } from "@nextui-org/react";
import { AiOutlineDelete } from "react-icons/ai";

export const MethodArccordion = ({ user }) => {
  return (
    // <Accordion options={user.paymentMethods}/>

    <div className="w-full bg-white dark:bg-slate-800 rounded-md py-2 px-4 max-w-lg overflow-auto max-h-80">
     {user.paymentMethods.length === 0 ? <h4 className="text-default-500">No hay ningun método de pago registrado</h4> :  <Accordion>
        {user.paymentMethods.map((method, index) => (
          <AccordionItem
          aria-label={method.name}
            key={index}
            title={
              <div className="flex flex-col">
                <p className="font-normal text-base">{method.name}</p>
                <p className="text-xs">{method.brand}</p>
              </div>
            }
          >
            <div className="flex justify-between  gap-2 py-2">
              
              <div className="flex flex-col gap-2">
                <p className="font-medium text-base">{method.number}</p>
                <p className="text-xs">{method.type}</p>
                <p className="text-xs">{method.brand}</p>
              </div>
              <Button isIconOnly className="bg-transparent border border-indigo-500 text-default-500 dark:text-default-700">
                <AiOutlineDelete size={25} />
              </Button>
            </div>
          </AccordionItem>
        ))}
      </Accordion>}
    </div>
  );
};
