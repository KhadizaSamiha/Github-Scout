import { useTheme } from "@/contexts/useTheme";


export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md border shadow bg-white dark:bg-gray-800 dark:text-white"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
