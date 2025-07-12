function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl text-blue-800 font-semibold dark:text-teal-500">
        Never Miss a blog!
      </h1>
      <p className="md:text-lg text-gray-600 pb-8 dark:text-gray-400">
        Subscribe to get the latest blog, new tech, and exclusive news
      </p>
      <form className="flex items-ceneter justify-between max-w-2xl w-full md:h-13 h-12 dark:bg-gray-300 bg-white rounded-md overflow-hidden border border-gray-300">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500 dark:placeholder:text-gray-500 dark:text-gray-800"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary-600 transition-all rounded-md py-2.5 cursor-pointer rounded-l-none dark:bg-emerald-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
