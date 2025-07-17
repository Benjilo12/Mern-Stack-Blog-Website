import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [latestblogs, setLatestBlogs] = useState([]);
  const [recentblogs, setRecentBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingLatestBlogs, setLoadingLatestBlogs] = useState(false);
  const [loadingRecentBlogs, setLoadingRecentBlogs] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingBlogs(false);
    }
  };

  const fetchLatestBlogs = async () => {
    try {
      setLoadingLatestBlogs(true);
      const { data } = await axios.get("/api/blog/latest");
      if (data.success) {
        setLatestBlogs(data.blogs);
      }
    } catch (error) {
      toast.error("Latest blogs fetch error:", error);
    } finally {
      setLoadingLatestBlogs(false);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      setLoadingRecentBlogs(true); // Fixed: using setLoadingRecentBlogs
      const { data } = await axios.get("/api/blog/recent");
      if (data.success) {
        setRecentBlogs(data.blogs);
      }
    } catch (error) {
      toast.error("Recent blogs fetch error:", error);
    } finally {
      setLoadingRecentBlogs(false); // Fixed: using setLoadingRecentBlogs
    }
  };

  // Initial data fetching
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchBlogs(), fetchLatestBlogs(), fetchRecentBlogs()]);
    };
    fetchData();
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    latestblogs,
    setLatestBlogs,
    loadingBlogs,
    loadingLatestBlogs,
    recentblogs,
    setRecentBlogs,
    loadingRecentBlogs,
    setLoadingRecentBlogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
