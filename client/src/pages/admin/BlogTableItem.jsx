import { X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function BlogTableItem({ blog, fetchBlogs, index }) {
  const { title, createdAt } = blog;

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirm) return;
    try {
      // Changed to DELETE method and added ID to URL
      const { data } = await axios.delete(`/api/blog/delete/${blog._id}`);

      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const BlogDate = new Date(createdAt);
  return (
    <tr className="border-y border-gray-300 dark:border-gray-600">
      <th className="px-2 py-4 dark:text-gray-300 text-gray-800">{index}</th>
      <td className="px-2 py-4 dark:text-gray-300 text-gray-800">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex  text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-1 mt-1 rounded cursor-pointer dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-gray-600"
        >
          {" "}
          {blog.isPublished ? "Unpublished" : "Published"}
        </button>
        <X
          onClick={deleteBlog}
          className="w-5 hover:scale-110 transition text-red-700 cursor-pointer dark:text-red-400 mt-2"
        />
      </td>
    </tr>
  );
}

export default BlogTableItem;
