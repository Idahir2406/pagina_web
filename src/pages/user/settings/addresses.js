import ProfileLayout from "components/profileLayout";
import { TableRow } from "components/littleComponents/tableRow";
import { useUser } from "hooks/useUser";
import { Button, Input } from "@nextui-org/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Head from "next/head";
export default function Addresses() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [newAdress, setNewAdress] = useState({
    street: "",
    state: "",
    city: "",
    reference: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setNewAdress({ ...newAdress, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!newAdress.street) {
      errors.street = "La calle es requerida";
    }
    if (!newAdress.state) {
      errors.state = "La provincia es requerida";
    }
    if (!newAdress.city) {
      errors.city = "La ciudad es requerida";
    }
    if (!newAdress.reference) {
      errors.reference = "La referencia es requerida";
    }
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    try {
      const res = await fetch(`/api/user/addresses/${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdress),
      });
      if (res.status === 200) {
        const data = await res.json();
        updateUser(data);
        setIsEditing(false);
        setNewAdress({
          street: "",
          state: "",
          city: "",
          reference: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/user/addresses/${user.email}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        updateUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article
      className={`flex dark:bg-slate-700 flex-col w-full bg-white rounded-md p-5 gap-1 md:col-span-2 transition-all`}
    >
      <Head>
        <title>Direcciones</title>
      </Head>
      <div>
        <h1 className="text-xl px-2 font-md">Direcciones</h1>
      </div>

      <section className="grid grid-cols-12 border-y dark:border-gray-500 py-4 px-2 mb-4">
        <span className="col-span-4">Calle</span>
        <span className="col-span-2">Provincia</span>
        <span className="col-span-2">Ciudad</span>
        <span className="col-span-3">Referencia</span>
        <span className="col-span-1"></span>
      </section>
      {user.adresses &&
        user.adresses.map(({ _id, street, state, city, reference }) => (
          <section key={_id} className="grid grid-cols-12 py-1 px-2 items-center">
            <span className="col-span-4">{street}</span>
            <span className="col-span-2">{state}</span>
            <span className="col-span-2">{city}</span>
            <span className="col-span-3">{reference}</span>

            <button
              onClick={() => handleDelete(_id)}
              className="hover:bg-gray-200 col-span-1 hover:dark:bg-slate-500 flex items-center justify-center rounded-full h-10 w-10 transition-colors text-default-600"
            >
              <AiOutlineDelete size={25} />
            </button>
          </section>
        ))}
      {isEditing && (
        <section className="grid grid-cols-12 border-t dark:border-gray-500 py-4  gap-2">
        <Input
          className="col-span-4"
          validationState={errors.street ? "invalid" : "valid"}
          errorMessage={errors.street}
          name="street"
          onChange={handleChange}
          label="Calle"
        />

        <Input
          className="col-span-2"
          validationState={errors.state ? "invalid" : "valid"}
          errorMessage={errors.state}
          name="state"
          onChange={handleChange}
          label="Provincia"
        />

        <Input
          className="col-span-2"
          validationState={errors.city ? "invalid" : "valid"}
          errorMessage={errors.city}
          name="city"
          onChange={handleChange}
          label="Ciudad"
        />

        <Input
          className="col-span-4"
          validationState={errors.reference ? "invalid" : "valid"}
          errorMessage={errors.reference}
          name="reference"
          onChange={handleChange}
          label="Referencia"
        />

      </section>
      )}
      {/* <table className="table-auto w-full">
        <thead>
          <tr className="border-y">
            <TableRow>Calle</TableRow>
            <TableRow>Provincia</TableRow>
            <TableRow>Ciudad</TableRow>
            <TableRow>Referencia </TableRow>
          </tr>
        </thead>
        <tbody>
          {user.adresses &&
            user.adresses.map((adress, index) => (
              <tr key={index}>
                <TableRow>{adress.street}</TableRow>
                <TableRow>{adress.state}</TableRow>
                <TableRow>{adress.city}</TableRow>
                <TableRow>{adress.reference}</TableRow>
                <TableRow>
                  <button onClick={()=>handleDelete(adress._id)} className="hover:bg-gray-200 hover:dark:bg-slate-500 flex items-center justify-center rounded-full h-10 w-10 transition-colors text-default-600">
                    <AiOutlineDelete size={25} />
                  </button>
                </TableRow>
              </tr>
            ))}
          {isEditing && (
            <tr className="">
              <TableRow>
                <Input
                  validationState={errors.street ? "invalid" : "valid"}
                  errorMessage={errors.street}
                  name="street"
                  onChange={handleChange}
                  label="Calle"
                />
              </TableRow>
              <TableRow>
                <Input
                  validationState={errors.state ? "invalid" : "valid"}
                  errorMessage={errors.state}
                  name="state"
                  onChange={handleChange}
                  label="Provincia"
                />
              </TableRow>
              <TableRow>
                <Input
                  validationState={errors.city ? "invalid" : "valid"}
                  errorMessage={errors.city}
                  name="city"
                  onChange={handleChange}
                  label="Ciudad"
                />
              </TableRow>
              <TableRow>
                <Input
                  validationState={errors.reference ? "invalid" : "valid"}
                  errorMessage={errors.reference}
                  name="reference"
                  onChange={handleChange}
                  label="Referencia"
                />
              </TableRow>
            </tr>
          )}
        </tbody>
      </table> */}
      <Button
        onClick={() => {
          if (isEditing) {
            return handleSubmit();
          }
          setIsEditing(!isEditing);
        }}
        variant="shadow"
        className="bg-violet-500 text-white"
      >
        {isEditing ? "Guardar" : <AiOutlinePlus size={20} className="m-auto" />}
      </Button>
    </article>
  );
}

Addresses.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
