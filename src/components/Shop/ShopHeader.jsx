function ShopHeader({ count }) {
  return (
    <div className="mb-6">
      <h1 className="font-bold text-3xl">All Products</h1>
      <p className="text-white/40 text-sm mt-1">{count} products found</p>
    </div>
  );
}

export default ShopHeader;
