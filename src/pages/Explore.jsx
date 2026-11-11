import { useState, useMemo, useEffect } from "react";
import { Search, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ExploreCard from "../components/Explore/ExploreCard";
import QuickView from "../components/Explore/QuickView";
import {
  useProductsQuery,
  useCategoriesQuery,
} from "../queries/productQueries";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

// TanStack Query demo page: category server-side (REST) filter, caching, prefetch, quick view
function Explore() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [quickViewId, setQuickViewId] = useState(null);

  const { data: categories = [] } = useCategoriesQuery();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useProductsQuery(category);

  // typing rukne ke 300ms baad hi search apply
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const visible = useMemo(() => {
    let result = [...products];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating.rate - a.rating.rate);

    return result;
  }, [products, debouncedSearch, sort]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] pb-24">
      <Navbar />

      <div className="px-6 lg:px-10 py-8 max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Explore <span className="text-lime-400">Products</span>
            </h1>
            <p className="text-white/40 text-sm mt-1">
              {visible.length} products
              {isFetching && !isLoading && (
                <span className="ml-2 text-lime-400/80 inline-flex items-center gap-1">
                  <RefreshCw size={11} className="animate-spin" /> updating
                </span>
              )}
            </p>
          </div>
        </div>

        {/* search + sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-white/5 border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-lime-400/50 placeholder:text-white/25"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#161616] border border-white/8 rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400/50"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* category chips - har chip ek REST call, cache ho jati hai */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize border transition-colors ${
                category === c
                  ? "bg-lime-400 text-black border-lime-400"
                  : "bg-white/5 text-white/60 border-white/8 hover:text-white"
              }`}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg font-medium">Couldn't load products</p>
            <p className="text-sm mt-1">{error?.message}</p>
            <button
              onClick={() => refetch()}
              className="mt-5 bg-lime-400 text-black text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-lime-300 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 transition-opacity ${
              isPlaceholderData ? "opacity-60" : "opacity-100"
            }`}
          >
            {visible.map((product) => (
              <ExploreCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewId}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {quickViewId && (
        <QuickView productId={quickViewId} onClose={() => setQuickViewId(null)} />
      )}
    </div>
  );
}

export default Explore;
