import { useState } from "react";
import { useTheme } from "next-themes";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { IconButton } from "./iconButton";
import { Button } from "@nextui-org/react";
export default function ThemeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [enabled, setEnabled] = useState(currentTheme === "dark");
  const toggleDarkMode = () => {
    setEnabled(!enabled);
    setTheme(currentTheme === "dark" ? "light" : "dark");

  };

  return (
    <Button isIconOnly className="bg-transparent hover:ring-1" onPress={toggleDarkMode}>
      {currentTheme === "dark" ? (
          <BsMoonFill size={20} className="text-yellow-400" />
          
        ) : (
          <BsSunFill size={20}  className="text-yellow-400" />
        )}
    </Button>
  );
}
