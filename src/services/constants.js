
export const Admin = "admin";
export const User = "user";
export const CurrentDate = new Date().toISOString().slice(0, 10);

export const authOptions = [
  {
    label: "Iniciar Sesión",
    href: "/auth/signin",

  },
  {
    label: "Registrate",
    href: "/auth/signup",
  }
]

export const profileOptions = [
  {
    label: "Perfil",
    url: "/user/settings/profile",
  },
  {
    label: "Configuración",
    url: "/products/1",
  },

];