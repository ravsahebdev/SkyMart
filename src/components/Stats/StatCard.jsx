
function StatCard({ icon: Icon, iconBg, value, label, sub }) {
  return (
    <div className="border border-white/80 rounded-2xl px-3 sm:px-5 py-5 flex items-center gap-4">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
      >
        <Icon size={19} />
      </div>
      <div>
        <p className="font-bold text-lg sm:text-xl leading-none">{value}</p>
        <p className="text-xs sm:text-sm mt-1.5">{label}</p>
        <p className="text-white/35 text-[11px] sm:text-xs">{sub}</p>
      </div>
    </div>
  );
}

export default StatCard;
