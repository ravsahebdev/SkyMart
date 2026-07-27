function CategoryCard({ name, count, icon }) {
  return (
    <button className="bg-white rounded-2xl p-6 text-center hover:-translate-y-0.5 hover:shadow-lg transition-all">
      <p className="text-3xl mb-3">{icon}</p>
      <p className="font-bold text-[#111] text-[15px]">{name}</p>
      <p className="text-black/40 text-xs mt-0.5">{count} items</p>
    </button>
  );
}

export default CategoryCard;
