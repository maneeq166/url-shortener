import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  return (
    <button
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      className="px-3 py-1 border rounded-md"
    >
      {mode === "dark" ? "Light" : "Dark"} Mode
    </button>
  );
}
