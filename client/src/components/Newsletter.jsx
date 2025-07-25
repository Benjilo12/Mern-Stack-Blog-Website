import toast from "react-hot-toast";

function Newsletter() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "1f08eceb-4cf3-4574-8bfe-2ad7547e06f0");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast.success("Success", res);
      event.target.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl text-blue-800 font-semibold dark:text-teal-500">
        Never Miss a blog!
      </h1>
      <p className="md:text-lg text-gray-600 pb-8 dark:text-gray-400">
        Subscribe to get the latest blog, new tech, and exclusive news
      </p>
      <form
        onSubmit={onSubmit}
        className="flex items-ceneter justify-between max-w-2xl w-full md:h-13 h-12 dark:bg-gray-300 bg-white rounded-md overflow-hidden border border-gray-300"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500 dark:placeholder:text-gray-500 dark:text-gray-800"
          required
        />
        <button
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-blue-500 hover:bg-primary-600 transition-all rounded-md py-2.5 cursor-pointer rounded-l-none dark:bg-emerald-500"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
