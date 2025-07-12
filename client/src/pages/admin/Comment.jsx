import { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function Comment() {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const [loading, setLoading] = useState(true); // Added loading state

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/comments");
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12">
      <div className="flex justify-between items-center max-w-5xl">
        <h1 className="dark:text-gray-50 text-gray-800 text-xl font-bold">
          Comments
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs text-white ${
              filter === "Approved"
                ? "bg-emerald-500 border-emerald-500"
                : "bg-blue-600 border-blue-600 hover:bg-blue-700"
            } transition-colors`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs text-white ${
              filter === "Not Approved"
                ? "bg-red-500 border-red-500"
                : "bg-red-400 border-red-400 hover:bg-red-500"
            } transition-colors`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-5xl overflow-auto mt-8 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        {loading ? (
          // Loading state
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          // Empty state
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No comments found
          </div>
        ) : (
          <table className="w-full">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-300 bg-gray-100 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 w-2/5">
                  Blog Title & Comment
                </th>
                <th scope="col" className="px-6 py-3 w-1/5">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 w-1/5">
                  Commenter
                </th>
                <th scope="col" className="px-6 py-3 w-1/5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="dark:text-gray-300">
              {comments
                .filter((comment) => {
                  if (filter === "Approved") return comment.isApproved === true;
                  return comment.isApproved === false;
                })
                .map((comment) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    fetchComments={fetchComments}
                  />
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Comment;
