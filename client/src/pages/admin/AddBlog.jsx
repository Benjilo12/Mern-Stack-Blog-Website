import { ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import upload from "../../components/images/upload.png";
import Quill from "quill";
import { blogCategories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

function AddBlog() {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true);

      // Validate required fields
      if (!image) {
        toast.error("Please upload a thumbnail image");
        return;
      }

      const content = quillRef.current?.root.innerHTML || "";
      if (content.replace(/<[^>]*>/g, "").trim().length < 50) {
        toast.error("Blog content is too short (min 50 characters)");
        return;
      }

      const blog = {
        title,
        subTitle,
        description: content,
        category,
        author,
        isPublished,
      };

      const formData = new FormData();
      formData.append("blog", JSON.stringify(blog));
      formData.append("image", image);

      const { data } = await axios.post("/api/blog/add", formData);

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setImage(false);
        setTitle("");
        setSubTitle("");
        setAuthor("");
        setCategory("Startup");
        setIsPublished(false);
        // Clear Quill editor
        if (quillRef.current) {
          quillRef.current.root.innerHTML = "";
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  // Preserved generateContent function
  const generateContent = async () => {
    if (!title) return toast.error("please enter a title");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate", {
        prompt: title,
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });

      const container = editorRef.current.querySelector(".ql-container");
      const toolbar = editorRef.current.querySelector(".ql-toolbar");

      if (container) container.classList.add("ql-container-dark");
      if (toolbar) toolbar.classList.add("ql-toolbar-dark");
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit} // Fixed to use handleSubmit
      className="flex-1 text-gray-800 h-full overflow-scroll"
    >
      <div className="w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow-lg rounded dark:bg-gray-700">
        <p className="dark:text-gray-50 mb-6">Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? upload : URL.createObjectURL(image)}
            className="mt-2 h-16 rounded cursor-pointer"
            alt="Thumbnail preview"
          />
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="dark:text-gray-50 mt-7">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg p-2 border mt-4 border-gray-300 outline-none rounded dark:placeholder:text-gray-400 dark:bg-gray-600 dark:text-gray-50"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="dark:text-gray-50 mt-7">Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg p-2 border mt-4 border-gray-300 outline-none rounded dark:placeholder:text-gray-400 dark:bg-gray-600 dark:text-gray-50"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="dark:text-gray-50 mt-7">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          <button
            disabled={loading}
            type="button"
            onClick={generateContent}
            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer dark:hover:bg-emerald-500 transition-colors dark:bg-emerald-400 underline-offset-4"
          >
            Generate with AI
          </button>
        </div>

        <p className="mt-4 dark:text-gray-100">Blog category</p>
        <select
          name="category"
          value={category}
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded dark:placeholder:text-gray-400 dark:bg-gray-600 dark:text-gray-50"
          onChange={(e) => setCategory(e.target.value)}
        >
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <p className="dark:text-gray-50 mt-7">Author</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg p-2 border mt-2 border-gray-300 outline-none rounded dark:placeholder:text-gray-400 dark:bg-gray-600 dark:text-gray-50"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />

        <div className="flex gap-2 mt-4 dark:text-gray-100">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button
          disabled={isAdding}
          type="submit"
          className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm dark:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
        >
          {isAdding ? "Adding..." : "Add Blog"}
        </button>
      </div>
    </form>
  );
}

export default AddBlog;
