import { Link } from "react-router-dom";
import { useDarkMode } from "../context/ThemeContext";
import { LogIn } from "lucide-react";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const { darkMode, setDarkMode } = useDarkMode();

  const { navigate, token } = useAppContext();
  return (
    <div className=" flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      <Link to="/" className="text-black text-2xl dark:text-gray-400">
        Benjis<span className="text-emerald-600">Blog</span>
      </Link>
      <div className="flex gap-7">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="md:px-3 md:py-2 text-[14px] py-1 px-1 bg-gray-200 rounded-md transition-all dark:text-gray-100  dark:bg-gray-600 d cursor-pointer"
        >
          {darkMode ? "🌙 dark mode" : "☀️ light mode"}
        </button>
        <button
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2 md:px-10 md:py-2.5"
          onClick={() => navigate("/admin")}
        >
          {token ? "Dashboard" : "Login"}
          <LogIn />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
