import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import { FormContainer, Form } from "components/form";
import { SocialContainer, Social } from "components/littleComponents/social";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import emailValidator from "email-validator";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { SocialButton } from "../../components/littleComponents/social";
import { Input, Button, Spinner } from "@nextui-org/react";
import { useUser } from "hooks/useUser";

export default function LoginPage() {
  const { getUser } = useUser();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // [1
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const errors = {};

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      errors.email = "El email es requerido";
    } else if (!emailValidator.validate(trimmedEmail)) {
      errors.email = "El email no es válido";
    }

    if (!trimmedPassword) {
      errors.password = "La contraseña es requerida";
    } else if (trimmedPassword.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    return errors;
  };

  const handleGoogleLogin = async () => {
    if (router.query.redirect)
      return await signIn("google", {
        callbackUrl: `http://localhost:3000${router.query.redirect}`,
      });
    await signIn("google", { callbackUrl: `http://localhost:3000` });
  };

  const handleFacebookLogin = async () => {
    signIn("facebook", { callbackUrl: "http://localhost:3000/" });
  };

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errores = validate();
    if (Object.keys(errores).length) return setErrors(errores);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (!res.error) {
        localStorage.setItem("user", JSON.stringify(res));
        await getUser();
        if (router.query.redirect)
        router.push(`http://localhost:3000${router.query.redirect}`);
      router.push("/");
      } else {
        setErrors({ ...errors, password: "Email o contraseña invalidos" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <section className="flex items-center justify-center h-[70vh]">
      <form
        className="rounded-md p-5 flex flex-col gap-3 justify-center bg-gray-50  dark:bg-slate-800 w-96"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl ">Inicia sesión</p>
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <Input
              label="Email"
              icon={<AiOutlineMail className="text-gray-600" size={25} />}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              errorMessage={errors.email}
            />

            <Input
              label="Contraseña"
              icon={<AiOutlineLock className="text-gray-600" size={25} />}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              errorMessage={errors.password}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Link className="text-sm hover:underline" href="./login">
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="text-sm flex flex-col">
              ¿No tienes una cuenta?
              <Link
                className="hover:underline md:text-end text-violet-400"
                href="./registro"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>

        <Button className="bg-indigo-700 hover:bg-indigo-800 text-white" type="submit">
          {loading ? <Spinner /> : "Iniciar sesión"}
        </Button>
        <Button
          onPress={handleGoogleLogin}
          className="bg-transparent ring-indigo-700 ring-1 hover:ring-2  transition"
        >
          Google
        </Button>
      </form>
    </section>
  );
}
