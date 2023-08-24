
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Input, Button, Spinner } from "@nextui-org/react";
import { useUser } from "hooks/useUser";
export default function Signin() {
  const { getUser } = useUser();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // [1
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = async() => {
    const errors = {};
    const emailValidator = await import("email-validator");
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
    const signIn = await import("next-auth/react").then((mod) => mod.signIn);
    if (router.query.redirect)
      return await signIn("google", {
        callbackUrl: `${router.query.redirect}`,
      });
    await signIn("google", { callbackUrl: `/` });
  };

  // const handleFacebookLogin = async () => {
  //   signIn("facebook", { callbackUrl: "/" });
  // };

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errores = validate();
    if (Object.keys(errores).length) return setErrors(errores);
    setLoading(true);
    const signIn = await import("next-auth/react").then((mod) => mod.signIn);
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
        router.push(`${router.query.redirect}`);
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
        <h3 className="text-2xl ">Bienvenido de nuevo :)</h3>
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
          <div className="flex md:flex-row gap-4 mt-2  justify-between ">
            <Link className="text-xs hover:underline" href="./login">
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="text-xs text-end">
              ¿No tienes una cuenta?
              <Link
                className="hover:underline md:text-end text-violet-400"
                href="./signup"
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
