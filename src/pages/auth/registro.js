import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Input, Button, FormContainer, Form } from "components/form";
import { SocialContainer, Social } from "components/littleComponents/social";
import { AiOutlineGooglePlus, AiOutlineTwitter } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import styles from "../../styles/auth.module.css";
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
    if (!newUser.username) errors.username = "El nombre de usuario es necesario";
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
      <Form onSubmit={handleSubmit}>
        <p className={styles.titulo}>Registrate</p>
        <Input
          placeholder="Nombre de usuario"
          onChange={handleChange}
          error={errors.username}
          name="username"
        />

        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          autoComplete="off"
          type="password"
          placeholder="Contraseña"
          name="password"
          onChange={handleChange}
          error={errors.password}
        />

        <Input
          autoComplete="off"
          type="password"
          placeholder="Confirmar contraseña"
          name="password2"
          onChange={handleChange}
          error={errors.password2}
        />
        <div className={styles.rightContainer}>
          <label className={styles.terms}>
            <input type="checkbox" value="terms_checkbox" /> Acepta los{" "}
            <a className={styles.a} href="">
              términos y condiciones
            </a>
          </label>
        </div>
        <div className={styles.button_container}>
          <Button label="Continuar" />
          <p className={styles.terms}>
            ¿Ya tienes una cuenta?{" "}
            <Link className={styles.a} href="./login">
              Inicia sesión
            </Link>
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
