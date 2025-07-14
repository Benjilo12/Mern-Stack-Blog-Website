import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { blogCategories } from "../assets/assets";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

function BlogPage() {
  const { blogs, loadingBlogs } = useAppContext();
  const [menu, setMenu] = useState("All");
  const navigate = useNavigate();

  const filteredBlogs = blogs.filter(
    (blog) => menu === "All" || blog.category === menu
  );

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-emerald-400 mb-2">
          Latest Stories
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Latest news about markets and price movements.
        </p>

        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-4 sm:gap-8 my-10 relative">
          {blogCategories.map((item) => (
            <div key={item} className="relative">
              <button
                className={`dark:text-gray-300 font-bold cursor-pointer text-gray-800 ${
                  menu === item &&
                  "text-white rounded-full bg-blue-700 px-4 pt-0.5 dark:text-white dark:bg-emerald-400 dark:px-4 dark:pt-0.5 dark:rounded-full"
                }`}
                onClick={() => setMenu(item)}
              >
                {item}
                {menu === item && (
                  <motion.div
                    layoutId="underline"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="absolute left-0 right-0 top-0 h-7 -z-1 bg-blue-500 rounded-full dark:bg-emerald-300"
                  ></motion.div>
                )}
              </button>
            </div>
          ))}
        </div>

        {loadingBlogs ? (
          <SkeletonList />
        ) : (
          <div className="space-y-8">
            {filteredBlogs.map((blog) => {
              const readingTime = calculateReadingTime(blog.description || "");
              return (
                <article
                  key={blog._id}
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="cursor-pointer flex flex-col md:flex-row gap-4 border-b border-gray-700 dark:border-gray-700 pb-6 hover:bg-blue-100 dark:hover:bg-gray-800 transition rounded"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full md:w-64 h-40 md:h-40 object-cover rounded"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      {/* Category tag added here */}
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-700 text-gray-50 dark:bg-blue-900/50 dark:text-emerald-300">
                          {blog.category}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 hover:underline underline-offset-2 dark:text-gray-50 hover:text-blue-600 dark:hover:text-blue-400">
                        {blog.title}
                      </h3>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-1">
                        <p className="text-sm text-cyan-500 dark:text-gray-400">
                          {new Date(blog.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-sm dark:text-teal-400 mt-1 md:mt-0 mr-3">
                          {readingTime} mins read
                        </p>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        {blog.subTitle?.slice(0, 200)}...
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
            {!filteredBlogs.length && (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
                No blogs found for this category.
              </p>
            )}
          </div>
        )}
      </main>

      {/* Footer should be placed here, outside the main content */}
      <Newsletter />
      <Footer />
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row gap-4 animate-pulse border-b border-gray-200 dark:border-gray-700 pb-6"
        >
          <div className="w-full md:w-64 h-40 md:h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="flex-1 space-y-3">
            {/* Skeleton for category tag */}
            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>

            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-3/4 rounded"></div>
            <div className="flex space-x-4">
              <div className="h-3 bg-gray-300 dark:bg-gray-700 w-1/3 rounded"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 w-1/4 rounded"></div>
            </div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 w-full rounded"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 w-5/6 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function calculateReadingTime(text) {
  const wordsPerMinute = 150;
  const textLength = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(textLength / wordsPerMinute));
}

export default BlogPage;
