import { NotebookPen, MessagesSquare, SquarePen, Notebook } from "lucide-react";
import { useEffect, useState } from "react";
import BlogTableItem from "./BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard");

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to load dashboard data");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10">
      <div className="flex flex-wrap gap-4 mb-8">
        {" "}
        {/* Added margin bottom */}
        {/* Stats cards */}
        <div className="flex items-center gap-4 shadow-lg p-4 min-w-[200px] rounded cursor-pointer hover:scale-105 transition-all dark:bg-gray-800">
          <NotebookPen className="text-blue-500 dark:text-gray-50" />
          <p className="text-xl font-semibold text-gray-600 dark:text-pink-400">
            {dashboardData.blogs}
          </p>
          <p className="font-bold dark:text-emerald-500 text-blue-500">Blogs</p>
        </div>
        <div className="flex items-center gap-4 p-4 min-w-[200px] rounded shadow-lg cursor-pointer hover:scale-105 transition-all dark:bg-gray-800">
          <MessagesSquare className="text-blue-500 dark:text-gray-50" />
          <p className="text-xl font-semibold text-gray-600 dark:text-pink-400">
            {dashboardData.comments}
          </p>
          <p className="text-blue-500 font-bold dark:text-emerald-500">
            Comments
          </p>
        </div>
        <div className="flex items-center gap-4 shadow-lg p-4 min-w-[200px] rounded cursor-pointer hover:scale-105 transition-all dark:bg-gray-800">
          <SquarePen className="text-blue-500 dark:text-gray-50" />
          <p className="text-xl font-semibold text-gray-600 dark:text-pink-400">
            {dashboardData.drafts}
          </p>
          <p className="text-blue-500 font-bold dark:text-emerald-500">
            Drafts
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 text-gray-600">
        {" "}
        {/* Added margin bottom */}
        <Notebook className="text-blue-500 dark:text-gray-50" />
        <h1 className="text-xl font-semibold dark:text-sky-400">
          Recent Blogs
        </h1>
      </div>

      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white dark:bg-gray-800">
        {dashboardData.recentBlogs.length > 0 ? (
          <table className="w-full text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-600 text-left uppercase dark:bg-gray-800 dark:text-gray-50">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-4">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-4">
                  Status
                </th>
                <th scope="col" className="px-2 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboardData}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No recent blogs found
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
