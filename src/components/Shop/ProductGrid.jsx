import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-white/40">
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm mt-1">Try changing your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
