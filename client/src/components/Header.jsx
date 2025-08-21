import { useRef, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import MarqBlog from "./MarqBlog";
import { Sparkle, X } from "lucide-react";
import gsap from "gsap";

function Header() {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();
  const bloggingRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  useEffect(() => {
    if (bloggingRef.current) {
      const text = bloggingRef.current;
      const letters = text.textContent.split("");
      text.textContent = "";

      letters.forEach((letter, i) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "rotateX(90deg)";
        text.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          rotationX: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: "back.out(1.7)",
        });
      });

      const spans = text.querySelectorAll("span");

      const rollAnimation = () => {
        gsap.to(spans, {
          rotationX: 90,
          opacity: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: "back.in(1.7)",
          onComplete: () => {
            gsap.set(spans, { rotationX: -90, opacity: 0 });
            gsap.to(spans, {
              rotationX: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.03,
              ease: "back.out(1.7)",
              onComplete: () => {
                setTimeout(rollAnimation, 3000);
              },
            });
          },
        });
      };

      setTimeout(rollAnimation, 4000);
    }
  }, []);

  return (
    <div className="relative overflow-hidden h-[75vh] md:h-[70vh] lg:h-[65vh]">
      <div
        className="absolute inset-0 
        bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 
        animate-gradient-shift"
      ></div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle
              dark:bg-emerald-400/80 dark:animate-twinkle-slow"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      <div className="mx-6 sm:mx-10 md:mx-16 lg:mx-24 xl:mx-32 lg:mt-7 relative h-full flex flex-col justify-center">
        <MarqBlog />
        <div className="text-center py-8 md:py-10 lg:py-12">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1 md:gap-3 md:px-5 md:py-1.5 mb-3 md:mb-4 border border-blue-400/70 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm text-white shadow-sm dark:bg-emerald-400/10 dark:border-emerald-400/30">
            <p className="font-bold text-white dark:text-gray-100">
              Email: topblog.com
            </p>
            <Sparkle className="size-4 md:size-5 text-yellow-300 dark:text-yellow-300" />
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="5000"
            data-aos-delay="50"
            className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-blue-400 dark:text-emerald-300"
          >
            <span ref={bloggingRef}>Blogging</span>{" "}
            <span className="text-white dark:text-gray-100">Without</span>{" "}
            <br className="hidden lg:block" />
            <span className="text-white">Boundaries</span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-duration="4000"
            className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-white/90 dark:text-gray-300 backdrop-blur-sm py-3 px-4 rounded-lg bg-white/10 dark:bg-gray-800/50"
          >
            This is my space to think out loud, share what matters to me, and
            write straight from the heart. Whether it's a fleeting thought or a
            deeper dive, my story unfolds right here. I'm glad you're along for
            the journey.
          </p>

          <form
            onSubmit={onSubmitHandler}
            className="flex justify-between max-w-lg max-sm:scale-90 mx-auto border border-white/20 bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-md dark:bg-gray-800/50"
            data-aos="fade-up"
          >
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className="relative flex-1"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for blogs"
                required
                className="w-full pl-3 py-2 pr-8 md:pl-4 md:py-3 md:pr-10 text-sm md:text-base outline-none bg-transparent text-white placeholder:text-white/70 dark:placeholder:text-gray-400"
              />
              {input && (
                <button
                  type="button"
                  onClick={onClear}
                  className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={16} className="md:size-[18px]" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 m-1 text-sm md:text-base md:px-5 md:py-3 rounded-lg lg:mb-2 hover:bg-blue-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm"
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
