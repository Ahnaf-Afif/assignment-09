"use client";
import { useState, useEffect } from "react";
import FacilityCard from "../../components/FacilityCard";
import { Search, SlidersHorizontal } from "lucide-react";

const sportTypes = [
  "All",
  "Football",
  "Badminton",
  "Swimming",
  "Tennis",
  "Cricket",
  "Basketball",
  "Volleyball",
  "Table Tennis",
];

const FacilitiesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get("type");
    setSelectedType(type || "All");
  }, []);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (selectedType !== "All") params.set("type", selectedType);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/facility?${params.toString()}`,
        );
        if (res.ok) {
          const data = await res.json();
          setFacilities(data);
        }
      } catch {
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, [search, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          All Facilities
        </h1>
        <p className="text-gray-500">
          Discover and book top sports facilities across Dhaka
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by facility name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-200 rounded-xl pl-10 pr-8 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white appearance-none"
          >
            {sportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sport Type Pills */}
      <div className="flex gap-2 flex-wrap mb-8">
        {sportTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedType === type
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-400 mb-5">
        Showing{" "}
        <span className="font-semibold text-gray-700">{facilities.length}</span>{" "}
        facilities
      </p>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
        </div>
      ) : facilities.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">
            No facilities found matching your search.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedType("All");
            }}
            className="mt-4 text-green-600 font-medium text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FacilitiesPage;
