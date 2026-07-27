import ProductCard from "./ProductCard";

function ProductList({ items }) {
  return (
    <div className="space-y-3">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
