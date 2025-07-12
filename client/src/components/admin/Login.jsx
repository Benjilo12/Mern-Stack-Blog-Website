import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Login() {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900/10">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float dark:bg-emerald-400/10"></div>
        <div className="absolute top-1/3 right-[20%] w-56 h-56 rounded-full bg-primary/10 blur-[100px] animate-float animation-delay-3000 dark:bg-emerald-400/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.08] dark:opacity-[0.03]"></div>
      </div>

      <div className="w-full max-w-md p-8 mx-4 border border-primary/30 shadow-xl dark:border-emerald-400/30 dark:shadow-emerald-400/25 shadow-primary/25 rounded-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center space-y-2">
            <h1 className="text-gray-950 dark:text-gray-50 text-3xl font-bold">
              <span className="text-primary dark:text-emerald-400">Admin</span>{" "}
              Login
            </h1>
            <p className="font-light text-primary/80 dark:text-pink-400/90">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-primary focus:ring-0 bg-transparent transition-all duration-200 dark:border-emerald-600 dark:focus:border-emerald-400 dark:text-gray-100"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="space-y-1 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border-b-2 border-gray-300 focus:border-primary focus:ring-0 bg-transparent transition-all duration-200 dark:border-gray-600 dark:focus:border-emerald-400 dark:text-gray-100 pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 mt-6 font-medium bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus:ring-emerald-400/50 shadow-md hover:shadow-lg active:translate-y-0"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
