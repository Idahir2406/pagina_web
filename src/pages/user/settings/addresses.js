
import ProfileLayout from "components/profileLayout";
import { TableRow } from "../../../../../components/littleComponents/tableRow";
import { useUser } from "../../../../../hooks/useUser";
import { Button } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";
export default function Addresses() {
  const { user } = useUser();
  return (
    <article className="flex dark:bg-slate-700 flex-col w-full bg-gray-100 rounded-md p-5 gap-1 md:col-span-2">
          <div>
            <h1 className="text-xl px-6 font-md">Direcciones</h1>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="border-y">
                <th className="text-start font-medium py-4 px-6">Calle</th>
                <th className="text-start font-medium py-4 px-6">Estado</th>
                <th className="text-start font-medium py-4 px-6">Ciudad</th>
                <th className="text-start font-medium py-4 px-6">Código</th>
              </tr>
            </thead>
            <tbody>
              {user.adresses &&
                user.adresses.map((adress, index) => (
                  <tr key={index}>
                    <TableRow>{adress.street}</TableRow>
                    <TableRow>{adress.state}</TableRow>
                    <TableRow>{adress.city}</TableRow>
                    <TableRow>{adress.postalCode}</TableRow>
                  </tr>
                ))}
            </tbody>
          </table>
          <Button variant="shadow" className="bg-violet-500 text-white">
            <AiOutlinePlus size={20} className="m-auto" />
          </Button>
        </article>
  )
}


Addresses.getLayout = function getLayout(page) {
  return  <ProfileLayout>{page}</ProfileLayout>
};
