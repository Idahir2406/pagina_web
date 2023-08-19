import { Input } from "@nextui-org/react";
import { AdminTab } from "../../components/tabs/AdminTab";
import dynamic from "next/dynamic";
const tabs = dynamic(() => import("../../services/constants").then((mod)=>mod.tabs), {ssr: false});
export default function ProductManagement() {
  

  return (
    <div>
      <h2>Gestión de productos</h2>
      
      <AdminTab tabs={tabs} />
    </div>
  );
}
