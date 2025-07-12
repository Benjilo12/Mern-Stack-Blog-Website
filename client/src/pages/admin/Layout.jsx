import { Link, Outlet } from "react-router-dom";
import { useDarkMode } from "../../context/ThemeContext";
import SideBar from "../../components/admin/SideBar";
import { useAppContext } from "../../context/AppContext";

function Layout() {
  const { darkMode, setDarkMode } = useDarkMode();

  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setToken(null);
    navigate("/");
  };
  return (
    <div>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-300 dark:border-gray-600">
        <Link to="/" className="text-black text-2xl dark:text-gray-400">
          Benjis<span className="text-emerald-600">Blog</span>
        </Link>
        <div className="flex items-center gap-7">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="px-3 py-2  bg-gray-200 rounded-md transition-all dark:text-gray-100  dark:bg-gray-900 dark:border-1 cursor-pointer"
          >
            {darkMode ? "🌙 dark mode" : "☀️ light mode"}
          </button>
          <button
            onClick={logout}
            className="text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex h-[calc(100vh-70px)]">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
