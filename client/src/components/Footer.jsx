import { Link, Links } from "react-router-dom";
import { footer_data } from "../assets/assets";

function Footer() {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <Link to="/" className="text-black text-2xl dark:text-gray-400">
            Benjis<span className="text-emerald-600">Blog</span>
          </Link>
          <p className="max-w-[410px] mt-3 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit,
            nulla magni! Omnis, aspernatur a voluptates enim dolor eligendi
            laudantium architecto nesciunt illo, sed adipisci reiciendis!
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5  dark:text-gray-300">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline transition dark:hover:text-emerald-400  text-gray-700 dark:text-gray-400 hover:text-blue-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80 dark:text-gray-400">
        Copyright 2025 @ PhidiumBlog - All Right Reserved
      </p>
    </div>
  );
}

export default Footer;
