import { Search } from "lucide-react";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name: A-Z" },
];

function ShopFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  sort,
  onSortChange,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-8">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
        />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-11 rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 outline-none placeholder:text-white/30 text-sm focus:border-lime-400/50 transition-colors"
        />
      </div>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-lime-400/50 transition-colors md:w-52 capitalize"
      >
        <option value="All Categories" className="bg-[#111]">
          All Categories
        </option>
        {categories.map((cat) => (
          <option key={cat} value={cat} className="bg-[#111] capitalize">
            {cat}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-lime-400/50 transition-colors md:w-52"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#111]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ShopFilters;
