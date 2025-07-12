import React, { useState } from "react";
import Marquee from "react-fast-marquee";

const MarqBlog = () => {
  // Sample blog data - replace with your actual data fetching logic
  const [latestPosts, setLatestPosts] = useState([
    {
      id: 1,
      title: "Ghana Boxing Authority eared before competing",
      category: "SPORTS",
      url: "/blog/ghana-boxing",
    },
    {
      id: 2,
      title:
        "Rev Ntim Fordjour must be arrested to substantiate claims - Sammy Gyamfi",
      category: "POLITICS",
      url: "/blog/fordjour-arrest",
    },
    {
      id: 3,
      title: "Ablakwa reveals Foreign Ministry's $15m anomaly",
      category: "POLITICS",
      url: "/blog/foreign-ministry-funds",
    },
    {
      id: 4,
      title: "New health guidelines for COVID-19 announced",
      category: "HEALTH",
      url: "/blog/covid-guidelines",
    },
    {
      id: 5,
      title: "Tech startup raises $10M in Series A funding",
      category: "TECHNOLOGY",
      url: "/blog/tech-funding",
    },
  ]);

  // In a real app, you would fetch this data from your API
  // useEffect(() => {
  //   const fetchLatestPosts = async () => {
  //     const response = await fetch('/api/posts/latest');
  //     const data = await response.json();
  //     setLatestPosts(data.slice(0, 5)); // Get first 5 posts
  //   };
  //   fetchLatestPosts();
  // }, []);

  return (
    <div className="bg-gray-200 py-2 px-4 shadow-sm dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center">
          <span className="font-bold text-lg mr-4 whitespace-nowrap dark:text-white">
            Top Blogs
          </span>
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
            className="overflow-hidden"
          >
            {latestPosts.map((post, index) => (
              <React.Fragment key={post.id}>
                <a
                  href={post.url}
                  className="mx-4 hover:text-blue-600 transition-colors inline-flex items-center"
                >
                  <span className="text-blue-500 mr-1 dark:text-emerald-600">
                    •
                  </span>
                  <span className="font-medium dark:text-gray-200 hover:text-blue-500 hover:underline">
                    {post.title}
                  </span>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-400 text-white rounded-full dark:bg-emerald-400">
                    {post.category}
                  </span>
                </a>
                {index < latestPosts.length - 1 && (
                  <span className="text-gray-300">|</span>
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
