
import { useState, useEffect } from "react";

function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Save theme whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-8 shadow-xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">
          Theme Switcher
        </h1>

        <p className="mb-6 opacity-80">
          Current theme: {darkMode ? "Dark Mode" : "Light Mode"}
        </p>

        <button
          onClick={toggleTheme}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            darkMode
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
              : "bg-gray-900 text-white hover:bg-gray-700"
          }`}
        >
          {darkMode ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
        </button>

        <div
          className={`mt-6 rounded-xl border p-4 ${
            darkMode ? "border-gray-600" : "border-gray-200"
          }`}
        >
          <h2 className="font-bold mb-2">Example Card</h2>
          <p className="text-sm opacity-80">
            Your theme preference will remain saved after refreshing
            the browser.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
