import { CircleCheckBig, Trash } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function CommentTableItem({ comment, fetchComments }) {
  // Destructure comment properties correctly
  const { blog, createdAt, _id, content, name } = comment; // Added text and user
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      // Fixed endpoint typo: "commnet" -> "comment"
      // Use POST method with payload
      const { data } = await axios.post("/api/admin/approve-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments(); // Refresh comments after approval
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?"
      );

      if (!confirm) return;
      // Fixed endpoint typo: "commnet" -> "comment"
      // Use POST method with payload
      const { data } = await axios.post("/api/admin/delete-comment", {
        id: _id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <tr className="border-b border-gray-300 dark:border-gray-700">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <div>
            <b className="font-medium text-gray-600 dark:text-teal-300">
              Blog:
            </b>{" "}
            <span className="italic dark:text-indigo-400">
              {blog?.title || "Untitled Blog"}
            </span>
          </div>
          <div className=" flex gap-2 mt-2">
            <b className="font-medium text-gray-600 dark:text-teal-300">
              Comment:
            </b>{" "}
            <span className="line-clamp-2 dark:text-cyan-600">{content}</span>{" "}
            {/* Use comment text */}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {BlogDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2 dark:bg-gray-600" />
          <span className="dark:text-sky-400">{name || "Unknown User"}</span>{" "}
          {/* Use user name */}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <button
              onClick={approveComment}
              className="p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
              title="Approve comment"
            >
              <CircleCheckBig className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </button>
          ) : (
            <span className="text-xs border border-green-600 text-green-600 rounded-full px-3 py-1 dark:text-green-400 dark:border-green-400">
              Approved
            </span>
          )}
          <button
            onClick={deleteComment}
            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer"
            title="Delete comment"
          >
            <Trash className="w-5 h-5 text-red-600 dark:text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default CommentTableItem;
