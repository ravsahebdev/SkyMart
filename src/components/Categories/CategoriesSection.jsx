import CategoryCard from "./CategoryCard";
import { categories } from "../../data/categories";

function CategoriesSection() {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-2xl">Shop by Category</h2>
        <a
          href="#"
          className="text-lime-400 text-sm font-medium flex items-center gap-1 hover:text-lime-300 transition-colors"
        >
          View All →
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.name} {...cat} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
