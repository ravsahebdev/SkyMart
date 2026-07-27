function AboutStatCard({ icon: Icon, value, label }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 text-center">
      <Icon size={22} className="text-lime-400 mx-auto mb-3" />
      <p className="font-bold text-2xl">{value}</p>
      <p className="text-white/40 text-sm mt-1">{label}</p>
    </div>
  );
}

export default AboutStatCard;
