/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { FaBuilding } from "react-icons/fa";

const Navbar = () => {
  return (
    <motion.header
      className="
        sticky top-0 z-50 mb-2 
        bg-linear-to-r from-[#0A0F1B] via-[#1E293B] to-[#0A0F1B]
        backdrop-blur-md
        shadow-[0_0_20px_rgba(16,185,129,0.1)]
        border-b border-slate-700
      "
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
    >
      <div className="px-6 py-3 flex justify-between items-center max-md:flex-col max-sm:py-2 gap-3">
        <Link
          to="/"
          className="
            text-3xl font-extrabold 
            bg-linear-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent
            hover:scale-105 transition duration-300 max-md:text-2xl max-sm:text-xl
          "
        >
          Company Directory
        </Link>

        {/* SEARCH + LINKS */}
        <div className="flex items-center gap-4 max-md:gap-3 max-sm:gap-2">
          <SearchBar />

          <Link
            to="/companies"
            className="
              px-4 py-2 rounded-lg font-mono
              text-slate-200 
              hover:text-emerald-400 
              transition duration-300 
              hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]
              hover:bg-slate-800/30
            "
          >
            <FaBuilding className="text-2xl" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
