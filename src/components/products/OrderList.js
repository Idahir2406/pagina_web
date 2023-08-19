import { Image } from "@nextui-org/react";
export const OrderList = ({ order }) => {
  return (
    <ul className="flex flex-col gap-4 divide-y-1">
      {order.order.map((product, index) => (
        <li className="" key={index}>
          <article className="p-8 gap-6 grid grid-cols-12 ">
            <div className="col-span-6 flex  gap-6">
              <picture className="">
                <Image
                  shadow="lg"
                  radius="md"
                  alt={product.name}
                  className="w-full object-cover h-[140px]"
                  src={product.image}
                />
              </picture>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-default-500 text-sm font-semibold">
                  $ {product.price}.00
                </p>
                <p className="text-default-500 text-sm">
                  Cantidad: {product.quantity}
                </p>
                <p className="text-default-500 text-sm">
                  {" "}
                  {product.description}
                </p>
              </div>
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <h3>Dirección de envío:</h3>
              <div className="text-default-500 text-sm">
                <p>{order.address.street}</p>
                <p>{order.address.city}</p>
                <p>{order.address.state}</p>
                <p>{order.address.postalCode}</p>
              </div>
            </div>
            <div className="col-span-3">
              <h3>Estado del pedido:</h3>
              <div className="text-default-500 text-sm">
                <p>{order.email}</p>
                <p>{order.phoneNumber}</p>
              </div>
            </div>
          </article>
        </li>
        // <Card
        //   shadow="lg"
        //   key={index}
        //   isPressable
        //   onPress={() => console.log("item pressed")}
        // >
        //   <CardBody className="overflow-visible p-0">
        //     <Image
        //       shadow="lg"
        //       radius="lg"
        //       width="100%"
        //       alt={product.name}
        //       className="w-full object-cover h-[140px]"
        //       src={product.image}
        //     />
        //   </CardBody>
        //   <CardFooter className="text-small justify-between">
        //     <b>{product.name}</b>
        //     <p className="text-default-500">{product.price}</p>
        //   </CardFooter>
        // </Card>
      ))}
    </ul>
  );
};
