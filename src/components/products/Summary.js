import Popover from "components/buttons/Popover";
export const Summary = ({
  subtotal,
  shipping,
  total,
  withButton,
  onClick,
  message,
}) => {
  return (
    <section className="flex justify-center flex-col  rounded-lg  col-span-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl dark:text-gray-200">Resumen de compra</h2>
      </div>
      <div className="flex text-default-500 dark:text-gray-200 text-sm flex-col divide-y gap-6">
        <div className="flex justify-between ">
          <p>Subtotal </p>
          <p>${subtotal}.00</p>
        </div>
        <div className="flex justify-between pt-3">
          <p>Envío </p>
          <p>${shipping}.00</p>
        </div>
        <div className="flex justify-between pt-4 text-base font-semibold">
          <p>Total </p>
          <p>${total}.00</p>
        </div>
      </div>
      {withButton && (
        <Popover
          className="w-full py-6 text-medium hover:bg-violet-600 mt-5"
          onClick={onClick}
          message={message}
        >
          Continuar con el pago
        </Popover>
      )}
    </section>
  );
};
