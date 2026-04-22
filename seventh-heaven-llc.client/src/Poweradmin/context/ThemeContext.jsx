import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// 🔹 Detect initial theme (localStorage → system)
const getInitialTheme = () => {
    if (localStorage.theme) {
        return localStorage.theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    // 🔹 Apply theme to <html> and persist
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.theme = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return context;
};
