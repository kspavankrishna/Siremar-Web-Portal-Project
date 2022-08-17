import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from  "../../contexts/ThemeContext";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(localStorage.darkMode);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.documentElement.style.setProperty('--bg-color',"white");
        document.documentElement.style.setProperty('--text-color',"black");
        document.documentElement.style.setProperty('--color-secondary',"rgb(240, 240, 241)");
       
        // $(':root').css('--bg-color', 'white');
        break;
      case themes.dark:
      default:
        // document.body.style.background = "white";
        document.documentElement.style.setProperty('--bg-color',"black");
        document.documentElement.style.setProperty('--text-color',"white");
        document.documentElement.style.setProperty('--color-secondary',"rgb(24, 24, 26)");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
