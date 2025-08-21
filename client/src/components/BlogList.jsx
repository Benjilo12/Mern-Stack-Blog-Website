import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { blogCategories } from "../assets/assets";
import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogCard from "./BlogCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [menu, setMenu] = useState(initialCategory);
  const { latestblogs, input, loadingLatestBlogs } = useAppContext();
  const cardsRef = useRef([]);
  const categoryRef = useRef(null);
  const hasAnimated = useRef(false);

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

  // GSAP animations for cards - runs only once
  useEffect(() => {
    if (
      !loadingLatestBlogs &&
      cardsRef.current.length > 0 &&
      !hasAnimated.current
    ) {
      hasAnimated.current = true;

      // Animate cards with staggered animation
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current[0]?.parentElement,
            start: "top 85%",
            toggleActions: "play none none none", // Only play once
            once: true, // Ensures it only happens once
          },
        }
      );

      // Hover animations for cards
      cardsRef.current.forEach((card) => {
        if (!card) return;

        // Scale up on hover
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
            y: -5,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          });
        });

        // Scale back to normal on mouse leave
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            y: 0,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
          });
        });
      });
    }

    return () => {
      // Clean up event listeners
      cardsRef.current.forEach((card) => {
        if (card) {
          card.removeEventListener("mouseenter", () => {});
          card.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, [loadingLatestBlogs, filteredBlogs, menu]);

  // Animation for category buttons - runs only once
  useEffect(() => {
    if (categoryRef.current && !hasAnimated.current) {
      gsap.fromTo(
        categoryRef.current.children,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
        }
      );
    }
  }, []);

  return (
    <div>
      <div
        ref={categoryRef}
        data-aos="fade-up"
        className="flex justify-center flex-wrap gap-4 sm:gap-8 my-10 relative"
      >
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              className={`dark:text-gray-300 flex flex-wrap text-xs md:text-[15px] font-bold cursor-pointer text-gray-800 ${
                menu === item &&
                "text-white px-4  pt-1 dark:text-white dark:bg-emerald-400 dark:px-4 dark:pt-0.5 dark:rounded-full"
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

      <div
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mx-8 sm:mx-16 xl:grid-cols-4 mb-24 xl:mx-40"
      >
        {loadingLatestBlogs
          ? Array.from({ length: 8 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          : filteredBlogs
              .filter((blog) => menu === "All" || blog.category === menu)
              .map((blog, index) => (
                <div
                  key={blog._id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="blog-card"
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
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
