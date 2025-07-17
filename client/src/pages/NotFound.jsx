import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sparkles, Home, RotateCw } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
      >
        {/* Animated 404 text */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="relative mb-8"
        >
          <h1 className="text-9xl font-bold text-gray-800 dark:text-white">
            4
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
              }}
              className="inline-block text-blue-500 dark:text-emerald-400"
            >
              0
            </motion.span>
            4
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-6"
          >
            <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200 mb-4">
            Oops! Lost in the cosmos?
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            The page you're looking for has been abducted by aliens or never
            existed. Let's get you back to safety!
          </p>
        </motion.div>

        {/* Animated buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/"
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg dark:bg-emerald-500 dark:hover:bg-emerald-600"
          >
            <Home className="mr-2" />
            Beam Me Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105 shadow dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          >
            <RotateCw className="mr-2" />
            Try Again
          </button>
        </motion.div>

        {/* Floating stars animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}

export default NotFound;
