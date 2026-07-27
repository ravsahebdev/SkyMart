function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-center gap-3 border border-white/8 rounded-2xl px-5 py-4">
      <Icon size={18} className="text-lime-400 flex-shrink-0" />
      <div>
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-white/40 text-xs mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
