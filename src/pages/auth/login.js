import { signIn } from "next-auth/react";
import { useState,useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/auth.module.css";
import Link from "next/link";
import { Input, Button, FormContainer, Form } from "components/form";
import { SocialContainer, Social } from "components/littleComponents/social";
import { FaGoogle,FaFacebook,FaTwitter } from "react-icons/fa";
import emailValidator from 'email-validator';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const errors = {};
  
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedEmail) {
      errors.email = 'El email es requerido';
    } else if (!emailValidator.validate(trimmedEmail)) {
      errors.email = 'El email no es válido';
    }
  
    if (!trimmedPassword) {
      errors.password = 'La contraseña es requerida';
    } else if (trimmedPassword.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
  
    return errors;
  };
  
  

  const handleGoogleLogin = async () => {
    signIn("google", { callbackUrl: "http://localhost:3000/" });
  };

  const handleFacebookLogin = async () => {
    signIn("facebook", { callbackUrl: "http://localhost:3000/" });
  };

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errores = validate();
    if (Object.keys(errores).length) return setErrors(errores);
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (!res.error) {
      
      router.push("/");
    } else {
      setErrors({ ...errors, password: "Invalid email or password" });
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <p className={styles.titulo}>Inicia sesión</p>
        <Input
          placeholder="Correo electrónico"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Contraseña"
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <div className={styles.rightContainer}>
          <Link className={styles.a} href="./login">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className={styles.button_container}>
          <Button type="submit" label="Iniciar" />
          <p className={styles.terms}>
            ¿No tienes una cuenta?{" "}
            <Link className={styles.a} href="./registro">
              Regístrate
            </Link>
          </p>
        </div>
        <SocialContainer>
          <Social>
          <FaTwitter
              style={{
                color: "#feffff",
                cursor: "pointer",
              }}
              size={30}
            />
            <FaGoogle
              onClick={handleGoogleLogin}
              style={{
                color: "#feffff",
                cursor: "pointer",
              }}
              size={30}
            />
            <FaFacebook
              onClick={handleFacebookLogin}
              style={{
                color: "#feffff",
                cursor: "pointer",
              }}
              size={30}
            />
          </Social>
        </SocialContainer>
      </Form>
    </FormContainer>
  );
}
