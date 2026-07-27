import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import StatsSection from "../components/Stats/StatsSection";
import CategoriesSection from "../components/Categories/CategoriesSection";
import ProductSection from "../components/Products/ProductSection";
import FeaturesSection from "../components/Features/FeaturesSection";
import Footer from "../components/Footer/Footer";
import { useProducts } from "../hooks/useProducts";

function Home() {
  const { products, loading } = useProducts();

  // rating.rate ke hisab se top 5 sabse zyada rated
  const topRated = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 5);

  // sabse recent id wale 5 - "new arrivals" ka simulation
  const newArrivals = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="px-6 lg:px-10 py-8 max-w-[1440px] mx-auto">
        <Hero />
        <StatsSection />
        <CategoriesSection />

        <div className="grid lg:grid-cols-2 gap-6 mt-12">
          <ProductSection title="Top Rated" items={topRated} loading={loading} />
          <ProductSection title="New Arrivals" items={newArrivals} loading={loading} />
        </div>

        <FeaturesSection />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
