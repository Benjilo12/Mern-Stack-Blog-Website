import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import { ThemeProvider } from "./context/ThemeContext";
import { AppProvider, useAppContext } from "./context/AppContext";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comment from "./pages/admin/Comment";
import Layout from "./pages/admin/Layout";
import Login from "./components/admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import BlogPage from "./pages/BlogPage";

// Create a separate component for routes that uses context
function AppRoutes() {
  const { token } = useAppContext();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<Blog />} />
      <Route path="/blogpage" element={<BlogPage />} />

      {/* Protected admin routes */}
      <Route path="/admin" element={token ? <Layout /> : <Login />}>
        <Route index element={<Dashboard />} />
        <Route path="addBlog" element={<AddBlog />} />
        <Route path="ListBlog" element={<ListBlog />} />
        <Route path="comments" element={<Comment />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <div className="dark:bg-gray-900">
      <Toaster />
      <AppProvider>
        <ThemeProvider>
          <AppRoutes /> {/* Use the context-aware component here */}
        </ThemeProvider>
      </AppProvider>
    </div>
  );
}

export default App;
