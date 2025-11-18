/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { searchQuery } = useSelector((state) => state.search);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch companies.json from PUBLIC folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/companies.json");
        const data = await res.json();
        setCompanies(data);
      } catch (error) {
        console.log("Error fetching companies:", error);
      }
    };
    fetchData();
  }, []);

  // FILTER + SEARCH + SORT
  const filtered = useMemo(() => {
    let data = [...companies];

    if (searchQuery.trim() !== "") {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (industry !== "") {
      data = data.filter((c) => c.industry === industry);
    }

    if (location !== "") {
      data = data.filter((c) => c.location === location);
    }

    if (sortOrder === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    return data;
  }, [companies, searchQuery, industry, location, sortOrder]);

  // PAGINATION
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-8 text-slate-100 min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Filters  */}
      <div className="flex gap-4 mb-8 max-sm:flex-col">
        <select
          value={industry}
          onChange={(e) => {
            setIndustry(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-slate-800 cursor-pointer border border-slate-700 rounded-lg text-slate-200 hover:border-emerald-400 transition"
        >
          <option value="Automobile">Automobile</option>
          <option value="Electronics">Electronics</option>
          <option value="Hospitality">Hospitality</option>
        </select>

        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-slate-800 cursor-pointer border border-slate-700 rounded-lg text-slate-200 hover:border-emerald-400 transition"
        >
          <option value="India">India</option>
          <option value="Japan">Japan</option>
          <option value="Germany">Germany</option>
          <option value="Singapore">Singapore</option>
          <option value="Canada">Canada</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 bg-slate-800 border cursor-pointer border-slate-700 rounded-lg text-slate-200 hover:border-emerald-400 transition"
        >
          <option value="">Sort by Name</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {/* Results  */}
      {currentItems.length === 0 ? (
        <p className="text-center text-4xl text-red-400">
          404 - No companies found. 😕
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((company) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
              whileHover={{ scale: 1.04 }}
              className="w-full"
            >
              <div
                className="
      bg-slate-900 border border-slate-400
      rounded-br-2xl rounded-tl-2xl p-5 shadow-lg
      hover:border-emerald-400 
      group
      hover:rounded-tr-2xl hover:rounded-bl-2xl
      hover:rounded-br-none hover:rounded-tl-none
      hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
      transition-all duration-300
      cursor-pointer
      flex justify-between items-center py-8
    "
              >
                <div>
                  <h2 className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-500 mb-2">
                    {company.name}
                  </h2>

                  <p className="text-slate-300">
                    <strong>Industry:</strong> {company.industry}
                  </p>

                  <p className="text-slate-300">
                    <strong>Location:</strong> {company.location}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 mt-2 text-sm">
                    Founded: {company.founded}
                  </p>

                  <p className="text-slate-500 text-sm">
                    Employees: {company.employees.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            className={`px-4 py-2 rounded bg-slate-800 border border-slate-700 
              disabled:opacity-40 ${
                currentPage !== 1 &&
                "hover:border-emerald-400 hover:bg-emerald-400 cursor-pointer hover:text-slate-900 transition"
              }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              className={`px-3 py-1 rounded-lg transition ${
                currentPage === idx + 1
                  ? "bg-emerald-500 text-black shadow-lg"
                  : "bg-slate-800 border cursor-pointer border-slate-700 hover:border-emerald-400"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className={`px-4 py-2 rounded bg-slate-800 border border-slate-700 
              disabled:opacity-40  transition ${
                currentPage !== totalPages &&
                "hover:bg-emerald-400 hover:border-emerald-400 cursor-pointer hover:text-slate-900"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
