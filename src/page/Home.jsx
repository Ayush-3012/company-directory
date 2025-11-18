/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      className="bg-slate-900"
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      <div
        className="
          relative w-full h-screen bg-cover bg-center 
          flex flex-col items-center justify-center
          text-slate-100
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"></div>

        <div className="relative text-center px-6">
          <h1
            className="
              text-6xl font-extrabold mb-4
              max-md:text-5xl max-sm:text-4xl
              drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]
            "
          >
            Welcome to{" "}
            <span
              className="
                bg-linear-to-r from-emerald-400 to-green-500
                bg-clip-text text-transparent
                drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]
              "
            >
              Company Directory
            </span>
          </h1>

          <p
            className="
              text-2xl font-light max-w-3xl mx-auto text-slate-300 
              max-md:text-xl max-sm:text-lg leading-relaxed
              drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]
            "
          >
            Explore top companies across multiple industries, filter results,
            and discover business insights — all in one place.
          </p>

          <div className="mt-8">
            <Link
              to="/companies"
              className="px-8 py-3 rounded-full text-lg font-semibold font-mono bg-emerald-500 text-black
                hover:bg-emerald-400 transition active:scale-95 duration-150 hover:shadow-[0_0_20px_rgba(16,185,129,0.7)]"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
