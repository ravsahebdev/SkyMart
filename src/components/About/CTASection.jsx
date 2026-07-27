import { Link } from "react-router-dom";

function CTASection() {
  return (
    <div className="border border-white/10 rounded-[28px] text-center py-14 px-6 mt-16 max-w-4xl mx-auto">
      <h2 className="font-bold text-3xl mb-2">Ready to shop?</h2>
      <p className="text-white/40 mb-7">
        Explore thousands of products at unbeatable prices.
      </p>
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 bg-lime-400 text-black font-bold px-6 py-3 rounded-xl hover:bg-lime-300 transition-colors"
      >
        Browse Products <span>→</span>
      </Link>
    </div>
  );
}

export default CTASection;
