import { Input, Textarea,  Image } from "@nextui-org/react";
import { CategorySelector } from "./CategorySelector";
import { useEffect, useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { InputFile } from "../littleComponents/InputFile";
import Popover from "../buttons/Popover";

export const AddTab = () => {
  const [selected, setSelected] = useState(new Set(["Muñecos"]));
  const [product, setProduct] = useState({
    category: "Muñecos",
  }); //[name,price,quantity,description
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [message, setMessage] = useState("");
 
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const newError = {};
    if (!product.name) newError.name = "Ingresa un nombre";
    if (!product.price) newError.price = "Ingresa un precio";
    if (!product.quantity) newError.quantity = "Ingresa una cantidad";
    if (!product.description) newError.description = "Ingresa una descripción";
    if (!image) newError.image = "Ingresa una imagen";

    setErrorMessage(newError);
    if (Object.keys(newError).length) return false;
    return true;
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: null });
    if (!e.target.files[0]) return;
    if (!e.target.files[0].type.includes("image"))
      return alert("El archivo debe ser una imagen");
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const res = await fetch("/api/products/imageHandler", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data;

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validation();
    if (!isValid) return;
    setLoading(true);
    try {
      const url = await uploadImage();
      setTimeout(async () => {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Asegúrate de establecer el tipo de contenido correctamente
          },
          body: JSON.stringify({...product,image:url}), // Aquí pasamos directamente el objeto product
        });
  
        const data = await res.json();
        setMessage(data);
      }, 1000);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

    }
  };

  const convertSelected = (field) =>
    Array.from(field).join(", ").replaceAll("_", " ");

  useEffect(() => {
    setProduct({ ...product, category: convertSelected(selected) });
  }, [setSelected, selected]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-8 lg:grid-cols-12 gap-4"
    >
      <div className="flex flex-col gap-4 md:col-span-6 lg:col-span-10">
        <Input
          defaultValue={product.name}
          validationState={errorMessage.name ? "invalid" : "valid"}
          errorMessage={errorMessage.name}
          name="name"
          onChange={handleChange}
          label="Nombre del producto"
        />
        <div className="flex flex-col sm:flex-row gap-4 ">
          <Input
            errorMessage={errorMessage.price}
            validationState={errorMessage.price ? "invalid" : "valid"}
            type="number"
            onChange={handleChange}
            name="price"
            label="Precio"

          />
          <Input
            validationState={errorMessage.quantity ? "invalid" : "valid"}
            errorMessage={errorMessage.quantity}
            type="number"
            onChange={handleChange}
            name="quantity"
            label="Cantidad"
          />
        </div>
        <Textarea
          validationState={errorMessage.description ? "invalid" : "valid"}
          errorMessage={errorMessage.description}
          onChange={handleChange}
          name="description"
          placeholder="Descripción"
          description="Ingresa una descripción del producto."
        />
      </div>
      <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-2 items-center ">
        {image ? (
          <InputFile
            name="image"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
            className="cursor-pointer"
          >
            <Image
              className="max-h-44"
              alt="product"
              src={URL.createObjectURL(image)}
            />
          </InputFile>
        ) : (
          <div className="flex flex-col items-center">
            <InputFile
              name="image"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png"
              className={`h-36 w-36  rounded-md cursor-pointer flex items-center justify-center relative  transition-colors text-gray-400 ${
                errorMessage.image
                  ? "bg-danger-50 text-danger-400"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {" "}
              <BsCameraFill size={90} />
            </InputFile>
            <span className="text-xs text-danger">{errorMessage.image}</span>
          </div>
        )}
        <div>
          <p className="text-sm text-gray-600">Categorías:</p>
          <CategorySelector
            name="category"
            onChange={setSelected}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <Popover type="submit" message={message}>
        Agregar producto
      </Popover>
      {/* <Button className="md:w-44 bg-violet-600 text-white" type="submit">
        {loading ? <Spinner /> : "Agregar producto"}
      </Button> */}
    </form>
  );
};

export const EditTab = () => {
  return (
    <form>
      <Input label="Nombre del producto" />
    </form>
  );
};

export const tabs = [
  {
    id: 1,
    title: "Agregar producto",
    body: <AddTab />,
  },
  {
    id: 2,
    title: "Editar producto",
    body: <EditTab />,
  },
];

export const categories = [
  {
    key: "Muñecos",
    name: "Muñecos",
  },
  {
    key: "Juegos_de_Baño",
    name: "Juegos de Baño",
  },
  {
    key: "Cubre_Sillas",
    name: "Cubre Sillas",
  },
  {
    key: "Adornos_Puertas",
    name: "Adornos Puertas",
  },
  {
    key: "Caminos_de_mesa",
    name: "Caminos de Mesa",
  },
  {
    key: "Cortineros",
    name: "Cortineros",
  },
  {
    key: "Candelabros",
    name: "Candelabros",
  },
  {
    key: "Individuales",
    name: "Individuales",
  },
  {
    key: "Cojines",
    name: "Cojines",
  },
];
