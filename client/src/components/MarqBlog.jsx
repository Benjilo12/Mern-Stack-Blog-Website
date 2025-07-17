import React from "react";
import Marquee from "react-fast-marquee";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MarqBlog = () => {
  const { recentblogs, loadingRecentBlogs } = useAppContext();
  const navigate = useNavigate();

  // Add loading state and error handling
  if (loadingRecentBlogs) {
    return (
      <div className="bg-gray-200 py-2 px-2 sm:px-4 shadow-sm dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center">
            <span className="font-bold text-base sm:text-lg mr-4 whitespace-nowrap text-purple-700 dark:text-amber-400">
              Spotlight
            </span>
            <p className="text-sm dark:text-gray-300 text-center">
              Loading recent blogs...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!recentblogs || recentblogs.length === 0) {
    return (
      <div className="bg-gray-200 py-2 px-2 sm:px-4 shadow-sm dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="flex items-center">
            <span className="font-bold text-base sm:text-lg mr-4 whitespace-nowrap text-purple-700 dark:text-amber-400">
              Spotlight
            </span>
            <p className="text-sm dark:text-gray-300">
              No recent blogs to display
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-200 py-2 px-2 sm:px-4 shadow-sm dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center">
          <span className="font-bold text-base sm:text-lg mr-0 sm:mr-4 whitespace-nowrap text-purple-700 dark:text-amber-400 mb-1 sm:mb-0">
            Spotlight
          </span>
          <Marquee
            speed={40}
            gradient={false}
            pauseOnHover={true}
            className="overflow-hidden"
          >
            {recentblogs.map((blog, index) => (
              <React.Fragment key={blog.id || index}>
                <div
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="mx-2 sm:mx-4 hover:text-blue-600 transition-colors inline-flex items-center cursor-pointer"
                >
                  <span className="text-blue-500 mr-1 dark:text-emerald-600 text-xs sm:text-sm">
                    •
                  </span>
                  <span className="font-medium dark:text-gray-200 hover:text-blue-500 hover:underline text-sm sm:text-base">
                    {blog.title && blog.title.length > 50
                      ? `${blog.title.substring(0, 50)}...`
                      : blog.title || "Untitled Post"}
                  </span>
                  {blog.category && (
                    <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs bg-blue-400 text-white rounded-full dark:bg-emerald-400">
                      {blog.category}
                    </span>
                  )}
                </div>
                {index < recentblogs.length - 1 && (
                  <span className="text-gray-300 mx-1">|</span>
                )}
              </React.Fragment>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default MarqBlog;
