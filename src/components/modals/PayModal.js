import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import Popover from "../buttons/Popover";
import { PayAccordion } from "../dropdowns/PayAccordion";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { useRouter } from "next/router";
const ModalContent = dynamic(() =>
  import("@nextui-org/react").then((mod) => mod.ModalContent)
);
const Modal = dynamic(() =>
  import("@nextui-org/react").then((mod) => mod.Modal)
);

export const PayModal = ({ calculo }) => {
  const { user, Loading, getUser } = useUser();
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState({
    paymentMethod: "",
    address: "",
  });
  const router = useRouter();
  const emptyCart = async () => {
    try {
      const res = await fetch(`/api/user/cart/${user.email}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (res.status === 200) {
        console.log("Carrito vaciado");
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitOrder = async () => {
    // if (!selected.address || !selected.paymentMethod)
    //   return setMessage(
    //     "Selecciona un método de pago y una dirección de envío"
    //   );
    try {
      let today = new Date();
      let date = today.toLocaleString();
      const res = await fetch(`/api/user/orders`, {
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
          phoneNumber: user.phoneNumber,
          email: user.email,
          date: date,
          paymentMethod: selected.paymentMethod,
        }),
      });
      const data = await res.json();
      setMessage(data);
      if (res.status === 200) emptyCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Popover
        message={message}
        onPress={() => {
          if (user.cart.length === 0)
            return setMessage("El carrito está vacio");
          onOpen();
        }}
      >
        Continuar con el pago
      </Popover>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Finalizar Compra
              </ModalHeader>
              <ModalBody>
                <PayAccordion addresses={user.adresses} selected={selected} setSelected={setSelected} paymentMethods={user.paymentMethods}/>
                <Link
                  onPress={handleSubmitOrder}
                  href={`https://wa.me/593986501698?text=Hola,%20soy%20${
                    user.username
                  }%20y%20estoy%20interesad@%20en%20los%20productos%20que%20están%20en%20la%20siguiente%20orden:%20*${
                    user.orders.length + 1
                  }*`}
                  target="_blank"
                >
                  Coordinar por Whatsapp
                  <AiOutlineWhatsApp size={25} />
                </Link>

                {/* <Popover message={message}  onPress={()=>{
                  router.push("https://wa.me/1XXXXXXXXXX?text=Hola!,%estoy%interesad@%en%estos%productos: ")
                  
                }}>
                </Popover> */}
                {/* <PayAccordion addresses={user.adresses} selected={selected} setSelected={setSelected} paymentMethods={user.paymentMethods}/> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
