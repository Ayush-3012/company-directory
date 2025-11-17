/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { searchQuery } = useSelector((state) => state.search);

  // 📌 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch companies.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/src/utils/companies.json");
        const data = await res.json();
        setCompanies(data);
        setFiltered(data);
      } catch (error) {
        console.log("Error fetching companies:", error);
      }
    };
    fetchData();
  }, []);

  // Apply filters + search + sort
  useEffect(() => {
    let data = [...companies];

    // 🔍 1. Search (Redux)
    if (searchQuery.trim() !== "") {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 🏭 2. Industry
    if (industry !== "") {
      data = data.filter((c) => c.industry === industry);
    }

    // 📍 3. Location
    if (location !== "") {
      data = data.filter((c) => c.location === location);
    }

    // 🔤 4. Sorting
    if (sortOrder === "asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFiltered(data);
    setCurrentPage(1); // Reset page on every filter/search change
  }, [companies, searchQuery, industry, location, sortOrder]);

  // ===================== PAGINATION LOGIC =====================
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // =============================================================

  return (
    <div className="p-6 text-slate-100">
      {/* ================= Filters UI ================= */}
      <div className="flex gap-4 mb-6 max-sm:flex-col">
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          <option value="">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="IT Services">IT Services</option>
          <option value="Food Delivery">Food Delivery</option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="Automobile">Automobile</option>
          <option value="Electronics">Electronics</option>
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          <option value="">All Locations</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="Japan">Japan</option>
          <option value="Germany">Germany</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-4 py-2 bg-gray-700 rounded"
        >
          <option value="">Sort by Name</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>

      {/* ===================== COMPANY CARDS ===================== */}
      {currentItems.length === 0 ? (
        <p className="text-center text-lg text-red-400">No companies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((company) => (
            <div
              key={company.id}
              className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700"
            >
              <h2 className="text-xl font-bold text-green-400">
                {company.name}
              </h2>
              <p className="text-gray-300">Industry: {company.industry}</p>
              <p className="text-gray-300">Location: {company.location}</p>
              <p className="text-gray-500 text-sm mt-1">
                Founded: {company.founded}
              </p>
              <p className="text-gray-500 text-sm">
                Employees: {company.employees.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ===================== PAGINATION UI ===================== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Prev
          </button>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-green-500 text-black"
                  : "bg-gray-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
