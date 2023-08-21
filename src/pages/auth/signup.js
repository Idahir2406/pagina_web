import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormContainer, Form } from "components/form";
import { Input, Checkbox, Button } from "@nextui-org/react";
import { useToggle } from "hooks/useToggle";
import dynamic from "next/dynamic";

const Spinner = dynamic(
  () => import("@nextui-org/react").then((mod) => mod.Spinner),
  {
    ssr: false,
  }
);
export default function Signup() {
  const { push } = useRouter();
  const { toggle, setToggle } = useToggle();
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

  const handleGoogleLogin = async () => {
    const signIn = await import("next-auth/react").then((mod) => mod.signIn);
    await signIn("google", { callbackUrl: `/` });
  };

  const createUser = async () => {
    try {
      setToggle(true);
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newUser, password: newUser.password }),
      });

      const data = await res.json();
      if (!res.ok) setErrors(data);
      push("/auth/signin");
    } catch (error) {
      console.log(error);
    } finally {
      setToggle(false);
    }
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

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} cl>
        <p>¡Vamos a empezar!</p>

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

        <Checkbox className="text-sm" color="secondary" defaultSelected>
          <p className="text-sm">Acepta los términos y condiciones</p>
        </Checkbox>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
            >
              {toggle ? <Spinner /> : "Continuar"}
            </Button>
            <Button
              onPress={handleGoogleLogin}
              className="bg-transparent ring-indigo-700 ring-1 hover:ring-2  transition"
            >
              Google
            </Button>
          </div>
          <p className="text-xs mt-1">
            ¿Ya tienes una cuenta?{" "}
            <Link className="hover:underline text-indigo-500" href="./signin">
              Inicia sesión
            </Link>
          </p>
        </div>
      </Form>
    </FormContainer>
  );
}
