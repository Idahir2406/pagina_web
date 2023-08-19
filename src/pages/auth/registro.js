import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormContainer, Form } from "components/form";
import { SocialContainer, Social } from "components/littleComponents/social";
import { AiOutlineGooglePlus, AiOutlineTwitter } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { Input, Checkbox, Button } from "@nextui-org/react";
import bcrypt from "bcryptjs";

export default function Registro() {
  const { push } = useRouter();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const validate = () => {
    const errors = {};
    if (!newUser.username)
      errors.username = "El nombre de usuario es necesario";
    if (!newUser.email) errors.email = "El correo electrónico es necesario";
    if (!newUser.password) errors.password = "La contraseña es necesaria";
    if (newUser.password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    if (newUser.password2 !== newUser.password)
      errors.password2 = "Las contraseñas deben coincidir";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      username: "",
      email: "",
      password: "",
    });
    const errores = validate();
    if (Object.keys(errores).length) return setErrors(errores);
    createUser();
  };

  const createUser = async () => {
    try {
      // Encriptar la contraseña antes de enviarla al servidor
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser, password: hashedPassword }),
      });

      const data = await response.json();
      if (response.status === 400) {
        setErrors(data);
      } else {
        push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} cl>
        <p>Registrate</p>

        <Input
          label="Nombre de usuario"
          onChange={handleChange}
          errorMessage={errors.username}
          name="username"
        />

        <Input
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          errorMessage={errors.email}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            autoComplete="off"
            type="password"
            label="Contraseña"
            name="password"
            onChange={handleChange}
            errorMessage={errors.password}
          />

          <Input
            autoComplete="off"
            type="password"
            label="Confirmar contraseña"
            name="password2"
            onChange={handleChange}
            errorMessage={errors.password2}
          />
        </div>
        <div>
          <Checkbox color="secondary" defaultSelected>
            Acepta los términos y condiciones
          </Checkbox>
        </div>
        <div>
          <Button type="submit" className="bg-indigo-700 text-white">
            Continuar
          </Button>
          <p>
            ¿Ya tienes una cuenta? <Link href="./login">Inicia sesión</Link>
          </p>
        </div>

        <SocialContainer>
          <Social>
            <AiOutlineTwitter
              style={{ color: "#feffff", fontSize: "1.7em", cursor: "pointer" }}
            />
            <AiOutlineGooglePlus
              style={{ color: "#feffff", fontSize: "1.8em", cursor: "pointer" }}
            />
            <GrFacebookOption
              style={{ color: "#feffff", fontSize: "1.3em", cursor: "pointer" }}
            />
          </Social>
        </SocialContainer>

      </Form>
    </FormContainer>
  );
}
