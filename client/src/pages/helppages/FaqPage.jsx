import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Hements from "../../components/Hements";

const faqItems = [
  {
    question: "How do I create an account on TopBlog?",
    answer:
      "To create an account, click on the 'Sign Up' button in the top right corner of the page. You'll need to provide your email address, choose a username, and create a password. After verifying your email, your account will be ready to use.",
  },
  {
    question: "Is TopBlog free to use?",
    answer:
      "Yes, TopBlog is completely free to use for all readers. We may introduce premium features in the future, but the core blogging platform will always remain free.",
  },
  {
    question: "How can I start writing my own blog posts?",
    answer:
      "Once you're logged in, click on your profile picture in the top right corner and select 'New Post' from the dropdown menu. This will open our editor where you can compose and format your blog post.",
  },
  {
    question: "Can I customize the appearance of my blog?",
    answer:
      "Yes! We offer several customization options including themes, fonts, and layout choices. You can access these options in your account settings under 'Blog Appearance'.",
  },
  {
    question: "How do I follow other bloggers?",
    answer:
      "When viewing another blogger's profile or post, click the 'Follow' button on their profile. You'll then see their new posts in your feed.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a link to reset your password. Make sure to check your spam folder if you don't see our email.",
  },
];

function FaqPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Hements title="FAQ">
        <Navbar />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 text-primary dark:text-emerald-400">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find answers to common questions about using TopBlog. Can't find
              what you're looking for?{" "}
              <a
                href="/contact"
                className="text-sky-500 dark:text-emerald-400 hover:underline"
              >
                Contact our support team
              </a>
              .
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors ${
                    activeIndex === index
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200">
                    {item.question}
                  </h3>
                  <motion.span
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500 dark:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-medium mb-4 dark:text-gray-300">
              Still have questions?
            </h3>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        <Footer />
      </Hements>
    </div>
  );
}

export default FaqPage;
