import { Link } from "react-router-dom";
import { useDarkMode } from "../context/ThemeContext";
import { LogIn } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import Topz from "../assets/Topz.png";

function Navbar() {
  const { darkMode, setDarkMode } = useDarkMode();

  const { navigate, token } = useAppContext();
  return (
    <div className=" flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer">
      <Link to="/" className="text-black text-2xl dark:text-gray-400 flex">
        <img
          src={Topz}
          alt="logo"
          className="md:w-12 md:h-10 dark:bg-gray-900 w-9 h-9"
        />
        <span className="text-emerald-600 text-[19px] mt-1 md:text-[27px] font-bold">
          <span className="text-cyan-600">Top</span>Blog
        </span>
      </Link>
      <div className="flex gap-7 font-bold">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="md:px-3 md:py-2 text-[14px] py-1 px-2 bg-gray-200 rounded-md transition-all dark:text-gray-100  dark:bg-gray-600 d cursor-pointer"
        >
          {darkMode ? "🌙 " : "☀️ "}
        </button>
        <button
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2 md:px-10 md:py-2.5"
          onClick={() => navigate("/admin")}
        >
          {token ? "Dashboard" : "Login"}
          <LogIn className="hidden md:block" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
