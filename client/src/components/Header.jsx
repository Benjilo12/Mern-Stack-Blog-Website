import { useRef } from "react";
import { useAppContext } from "../context/AppContext";
import MarqBlog from "./MarqBlog";
import { Sparkle, X } from "lucide-react";
import blogvideo from "../assets/blogvideo.mp4";

function Header() {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div className="relative overflow-hidden h-[75vh] ">
      {" "}
      {/* Changed from h-screen max-h-[800px] */}
      {/* Video Background with Dark Overlay */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={blogvideo} type="video/mp4" />
          <img
            src="/fallback-image.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/75 dark:bg-black/90"></div>
      </div>
      {/* Content */}
      <div className="mx-8 sm:mx-16 xl:mx-24 relative h-full flex flex-col justify-center">
        <MarqBlog />
        <div className="text-center py-12">
          {/* Email badge */}
          <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-blue-400/70 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm dark:bg-emerald-400/10 dark:border-emerald-400/30">
            <p className="font-bold text-white dark:text-gray-100">
              Email: topblog.com
            </p>
            <Sparkle className="text-yellow-300 dark:text-yellow-300" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-blue-400 dark:text-emerald-300  ">
            Blogging{" "}
            <span className="text-white dark:text-gray-100">Without</span>{" "}
            <br className="hidden sm:block" />
            <span className="text-white">Boundaries</span>
          </h1>
          {/* Description */}
          <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-white/90 dark:text-gray-300 backdrop-blur-sm py-3 px-4 rounded-lg bg-white/10">
            This is my space to think out loud, share what matters to me, and
            write straight from the heart. Whether it's a fleeting thought or a
            deeper dive, my story unfolds right here. I'm glad you're along for
            the journey.
          </p>
          {/* Search form */}
          <form
            onSubmit={onSubmitHandler}
            className="flex justify-between max-w-lg max-sm:scale-90 mx-auto border border-white/20 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-md dark:bg-gray-800/50"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for blogs"
                required
                className="w-full pl-4 py-3 pr-10 outline-none bg-transparent text-white placeholder:text-white/70 dark:placeholder:text-gray-400"
              />
              {input && (
                <button
                  type="button"
                  onClick={onClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 m-1 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer shadow-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
