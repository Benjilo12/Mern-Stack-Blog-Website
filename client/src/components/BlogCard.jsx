import { useNavigate } from "react-router-dom";
import avatar from "./images/avatar.jpg";

// const calculateReadingTime = (text) => {
//   const wordsPerMinute = 150;
//   const textLength = text.split(/\s+/).length;
//   return Math.ceil(textLength / wordsPerMinute);
// };

function BlogCard({ blog }) {
  const { title, subTitle, category, image, slug, author } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${slug}`)}
      className="w-full rounded-xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer 
      bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-primary/30
      dark:hover:border-emerald-400/30 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-3 left-3 px-3 py-1 font-bold bg-sky-500/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full 
        text-gray-50 text-xs dark:text-emerald-300 shadow-sm"
        >
          {category}
        </span>
      </div>

      <div className="p-5 space-y-3">
        <h5
          className="text-[18px] font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-500 
        transition-colors duration-200 line-clamp-2 hover:underline underline-offset-4"
        >
          {title}
        </h5>
        <p
          className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: subTitle?.slice(0, 130) || "" }}
        ></p>

        <div className="flex items-center  pt-3">
          <img
            src={avatar}
            alt={author}
            className="w-8 h-8 rounded-full  object-cover border-2 border-white dark:border-gray-700 shadow-sm"
          />
          <div>
            <p className="text-sm text-sky-500 ml-1 font-medium mt-1 dark:text-teal-400">
              {author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
