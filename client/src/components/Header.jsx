import { useRef } from "react";
import { useAppContext } from "../context/AppContext";
import MarqBlog from "./MarqBlog";
import { Sparkle, X } from "lucide-react";

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
    <div className="relative overflow-hidden">
      {/* Enhanced light mode background elements */}
      <div className="absolute inset-0 -z-10 block dark:hidden">
        {/* Gradient background with more color */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 via-blue-100 to-indigo-300" />

        {/* More prominent floating elements */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-200/30 backdrop-blur-md blur-xl opacity-80" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-purple-200/30 backdrop-blur-md blur-xl opacity-70" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-200/25 backdrop-blur-md blur-xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-pink-200/25 backdrop-blur-md blur-xl opacity-50" />

        {/* Subtle noise texture for depth */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIiB4PSIwIiB5PSIwIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjciIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIC8+CiAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIiAvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDMiIC8+Cjwvc3ZnPg==')] opacity-20" />
      </div>

      {/* Dark mode background elements */}
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <div className="absolute -right-24 -top-24 w-[500px] h-[500px] rounded-full bg-primary/10 backdrop-blur-sm dark:bg-emerald-500/10" />
        <div className="absolute -left-16 top-1/3 w-[300px] h-[300px] rounded-full bg-primary/10 backdrop-blur-sm dark:bg-emerald-500/10" />
        <div className="absolute right-32 bottom-0 w-[400px] h-[400px] rounded-full bg-primary/10 backdrop-blur-sm dark:bg-emerald-500/10" />
      </div>

      <div className="mx-8 sm:mx-16 xl:mx-24 relative pt-10">
        <MarqBlog />
        <div className="text-center mt-16 mb-8 py-12">
          {/* Email badge */}
          <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-emerald-300/70 bg-white backdrop-blur-sm rounded-full text-sm text-primary shadow-sm dark:bg-emerald-400/10 dark:border-emerald-400/30">
            <p className="font-bold text-gray-700 dark:text-gray-100">
              Email: benjamindarteyy@gmail.com
            </p>
            <Sparkle className="text-yellow-500 dark:text-yellow-300" />
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-800 dark:text-gray-100">
            Your own{" "}
            <span className="text-primary dark:text-emerald-300">Blogging</span>{" "}
            <br className="hidden sm:block" />
            platform
          </h1>

          {/* Description */}
          <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300 backdrop-blur-sm py-3 px-4 rounded-lg shadow-2xl bg-white/80">
            This is your space to think out loud, to show what matters, and to
            write without filters. Whether it's one word or a thousand, your
            story starts right here
          </p>

          {/* Search form */}
          <form
            onSubmit={onSubmitHandler}
            className="flex justify-between max-w-lg max-sm:scale-90 mx-auto border border-gray-200 bg-white backdrop-blur-sm rounded-xl overflow-hidden shadow-md dark:bg-gray-800/50 dark:border-gray-700"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for blogs"
                required
                className="w-full pl-4 py-3 pr-10 outline-none bg-transparent text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400 dark:text-white"
              />
              {input && (
                <button
                  type="button"
                  onClick={onClear}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 m-1 rounded-lg hover:opacity-90 transition-opacity cursor-pointer shadow-sm dark:bg-emerald-500 dark:hover:bg-emerald-400"
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
