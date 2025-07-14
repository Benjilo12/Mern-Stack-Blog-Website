import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Moment from "moment";
import avatar from "../components/images/avatar.jpg";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Clock9 } from "lucide-react";

const calculateReadingTime = (text) => {
  const wordsPerMinute = 150;
  const textLength = text.split(/\s+/).length;
  return Math.ceil(textLength / wordsPerMinute);
};

function Blog() {
  const { axios } = useAppContext();
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const readingTime = calculateReadingTime(content);

  const fetchBlogData = async () => {
    try {
      setBlogLoading(true);
      const { data } = await axios.get(`/api/blog/${slug}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBlogLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      // Corrected endpoint with GET method
      const { data } = await axios.get(`/api/blog/comments/${slug}`);

      if (data.success) {
        setComments(data.comments || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCommentsLoading(false);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      // Send slug instead of ID
      const { data } = await axios.post("/api/blog/add-comment", {
        slug,
        name,
        content,
      });

      if (data.success) {
        toast.success("Comment submitted for review!");
        setName("");
        setContent("");
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlogData();
      fetchComments();
    }
  }, [slug]);

  if (blogLoading || !data) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-50">
        {/* ... existing background ... */}
      </div>

      <Navbar />
      <div className="text-center mt-10  text-gray-600">
        <p className="text-primary py-2 font-medium dark:text-emerald-400 inline-flex items-center justify-center gap-4 px-6 mb-8 border border-primary/40 bg-primary/10 backdrop-blur-sm rounded-full text-sm dark:bg-emerald-400/10 dark:border-emerald-400/30">
          Published on {Moment(data.createdAt).format("MMM Do YYYY")}
        </p>
        <h1 className="text-2xl sm:text-5xl mb-5 font-semibold max-w-1xl mx-auto dark:text-white text-gray-900">
          {data.title}
        </h1>

        <div className="">
          {" "}
          <span className="font-bold mr-2 dark:text-gray-50">Author:</span>
          <p className="inline-block py-1   mb-6  text-[15px]  font-bold text-primary  dark:text-pink-400">
            {data.author}
          </p>
        </div>
        <div className="inline-flex gap-1">
          <p className="inline-flex">
            <Clock9
              size={20}
              className="mr-1 text-sky-500 dark:text-cyan-500"
            />
            <span className="dark:dark:text-cyan-500  text-sky-500 text-[15px]">
              Read time:
            </span>
          </p>
          <p className="dark:text-gray-400  text-sky-600">{readingTime}mins</p>
        </div>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6 ">
        <img
          src={data.image}
          alt={data.title}
          className="rounded-3xl mb-5 w-full max-h-[500px] object-cover"
        />

        <div
          className="rich-text max-w-5xl mx-auto text-gray-800 mt-15 dark:text-gray-300 prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comment Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="dark:text-emerald-500 text-blue-800 font-semibold mb-4">
            Comments ({comments.length})
          </p>

          {commentsLoading ? (
            <p className="text-center py-4">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 italic">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-2 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={avatar}
                      alt={item.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium dark:text-pink-400 text-blue-600">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[14px] text-gray-700 dark:text-gray-300">
                        {item.content}
                      </p>
                      <div className="mt-2 text-xs text-teal-500 dark:text-gray-400">
                        {Moment(item.createdAt).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="max-w-3xl mx-auto mb-16">
          <p className="font-semibold mb-4 dark:text-emerald-500">
            Add your comment
          </p>
          <form
            className="flex flex-col items-start gap-4 max-w-lg"
            onSubmit={addComment}
          >
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <textarea
              placeholder="Your comment..."
              required
              className="w-full p-3 border border-gray-300 rounded-lg outline-none h-32 focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:border-gray-700"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <button
              type="submit"
              className="bg-primary text-white rounded-lg p-3 px-8 hover:bg-primary-dark transition-colors cursor-pointer dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Submit Comment
            </button>
          </form>
        </div>

        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4 dark:text-gray-50">
            Share this article on social media
          </p>
          {/* Social sharing buttons would go here */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;
