function ValueCard({ icon: Icon, title, desc }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 flex gap-4">
      <div className="w-10 h-10 rounded-lg bg-lime-400/10 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-lime-400" />
      </div>
      <div>
        <p className="font-bold text-base mb-1">{title}</p>
        <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default ValueCard;
