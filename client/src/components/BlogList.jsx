import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { blogCategories } from "../assets/assets";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogCard from "./BlogCard";

function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [menu, setMenu] = useState(initialCategory);
  const { latestblogs, input, loadingLatestBlogs } = useAppContext();

  const filteredBlogs = latestblogs.filter((blog) => {
    const searchTerm = input.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.category.toLowerCase().includes(searchTerm)
    );
  });

  const handleCategoryChange = (category) => {
    setMenu(category);
    // Update URL params without page reload
    setSearchParams({ category });
  };

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-4 sm:gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              className={`dark:text-gray-300 flex flex-wrap text-xs md:text-[15px] font-bold cursor-pointer text-gray-800 ${
                menu === item &&
                "text-white px-4 pt-0.5 dark:text-white dark:bg-emerald-400 dark:px-4 dark:pt-0.5 dark:rounded-full"
              }`}
              onClick={() => handleCategoryChange(item)}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-blue-500 rounded-full dark:bg-emerald-300"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mx-8 sm:mx-16 xl:grid-cols-4 mb-24 xl:mx-40">
        {loadingLatestBlogs
          ? Array.from({ length: 8 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          : filteredBlogs
              .filter((blog) => menu === "All" || blog.category === menu)
              .map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>

      <div className="flex justify-center">
        <Link
          to={`/blogpage${menu !== "All" ? `?category=${menu}` : ""}`}
          className="inline-block px-4 py-2 rounded-full bg-blue-500 text-white font-semibold text-sm md:text-base shadow hover:bg-blue-700 hover:scale-105 active:scale-95 transition dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogList;
