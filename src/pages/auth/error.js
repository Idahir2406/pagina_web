import { useRouter } from "next/router";
export default function Error() {
  const { query } = useRouter();
  console.log(query);
  return (
    <div className="flex justify-center items-center h-96">
      <div className="bg-slate-800 p-4 rounded-md">
        <h3>Error de Autenticación</h3>
        <p>{query.error}</p>
      </div>
    </div>
  );
}
