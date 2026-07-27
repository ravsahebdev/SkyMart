import { useState, useMemo } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ShopHeader from "../components/Shop/ShopHeader";
import ShopFilters from "../components/Shop/ShopFilters";
import ProductGrid from "../components/Shop/ProductGrid";
import { useProducts } from "../hooks/useProducts";

function Shop() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("featured");

  // API se aaye products me se unique categories nikalna
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  // search -> filter -> sort, sab yahi ek jagah compute ho raha hai
  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (category !== "All Categories") {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, sort]);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="px-6 lg:px-10 py-8 max-w-[1440px] mx-auto">
        <ShopHeader count={visibleProducts.length} />

        <ShopFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          sort={sort}
          onSortChange={setSort}
        />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg font-medium">Couldn't load products</p>
            <p className="text-sm mt-1">{error} — check your connection and refresh</p>
          </div>
        ) : (
          <ProductGrid products={visibleProducts} />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
