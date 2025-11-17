/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <motion.header
        className="sticky mb-2 top-0 z-50 bg-linear-to-r from-gray-950 via-gray-700 to-gray-900 shadow-lg"
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
      >
        <div className="px-6 py-3 flex  max-sm:flex-col max-sm:py-0.5 justify-between items-center">
          <Link
            to={"/"}
            className="text-2xl font-bold text-green-400 hover:text-green-200 transition duration-300"
          >
            Home
          </Link>

          <div className="flex items-center">
            <SearchBar />
            <Link
              to={"/Companies"}
              className="cursor-pointer group hover:shadow-green-400 hover:scale-110 rounded-full hover:shadow-[1px_1px_15px] p-2 text-slate-200 hover:text-green-400 transition duration-300"
            >
              <div className="flex relative">Companies</div>
            </Link>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
