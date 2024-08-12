"use client";

export default function SearchAndFilter({
  searchText,
  setSearchText,
  filterType,
  setFilterType,
  filterOptions = ["All"],
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Search orders..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 sm:mb-0 sm:mr-4 p-2 border border-gray-300 rounded-lg w-full sm:w-1/2 lg:w-1/3"
      />

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-full sm:w-1/4 lg:w-1/5"
      >
        {filterOptions.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? "All Types" : `Type ${option}`}
          </option>
        ))}
      </select>
    </div>
  );
}
