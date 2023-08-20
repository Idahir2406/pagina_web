import { BiUserCircle, BiLogOut, BiCog } from "react-icons/bi";
const notifications = [
  {
    id: 1,
    content: "Notificación 1",
    link: "/products/1",
  },
  {
    id: 2,
    content: "Notificación 2",
    link: "/products/1",
  },
  {
    id: 3,
    content: "Notificación 3",
    link: "/products/1",
  },
];
const authOptions = [
  {
    id: 1,
    content: "Iniciar sesión",
    link: "/auth/login",
  },
  {
    id: 2,
    content: "Registrarse",
    link: "/auth/registro",
  },
];
const profileOptions = [
  {
    id: 1,
    content: <p>Perfil</p>,
    icon: <BiUserCircle className="mr-3" size={25} />,
    link: "/user/settings/profile",
  },
  {
    id: 2,
    content: <p>Configuración</p>,
    icon: <BiCog className="mr-3" size={25} />,
    link: "/products/1",
  },

  {
    id: 3,
    content: <p>Cerrar sesión</p>,
    icon: <BiLogOut className="mr-3" size={25} />,
    onClick: handleLogout,
  },
];

const months = [
  "01","02","03","04","05","06","07","08","09","10","11","12"
];

const years = [
  "2024", "2025", "2026", "2027", "2028", "2029", "2030"
]