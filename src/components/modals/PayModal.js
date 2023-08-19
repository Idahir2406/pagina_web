import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import Popover from "../buttons/Popover";
import { PayAccordion } from "../dropdowns/PayAccordion";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
export const PayModal = ({calculo}) => {
  const { user, Loading, getUser } = useUser();
  const [message, setMessage] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [selected, setSelected] = useState({
    paymentMethod: "",
    address: "",
  });
  const emptyCart = async() => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/cart/${user.email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (res.status === 200) {
        console.log("Carrito vaciado");
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmitOrder = async () => {
    if(!selected.address || !selected.paymentMethod) return setMessage("Selecciona un método de pago y una dirección de envío");
    try {
     
      let today = new Date();
      let date = today.toLocaleString();
      const res = await fetch(`http://localhost:3000/api/user/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          order: user.cart,
          address: selected.address,
          subtotal: calculo.subtotal,
          total: calculo.total,
          shippingCost: calculo.envio,
          phoneNumber:user.phoneNumber,
          email:user.email,
          date:date,
          paymentMethod:selected.paymentMethod

         }),
      });
      const data = await res.json();
      setMessage(data);
      if(res.status === 200) emptyCart();
    } catch (error) {
      console.log(error);
    } 
  };
  
  return (
    <> 
      <Popover message={message} onPress={()=>{
        if(user.cart.length === 0) return setMessage("El carrito está vacio");
        onOpen();
      }}>Continuar con el pago</Popover>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
               <PayAccordion addresses={user.adresses} selected={selected} setSelected={setSelected} paymentMethods={user.paymentMethods}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cerrar
                </Button>
                <Popover message={message}  onPress={()=>{
                  handleSubmitOrder();
                  
                }}>
                  Comprar
                </Popover>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}