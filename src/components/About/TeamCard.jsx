function TeamCard({ name, role, initial, color }) {
  return (
    <div className="border border-white/10 rounded-2xl p-6 text-center">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-4 ${color}`}
      >
        {initial}
      </div>
      <p className="font-semibold text-[15px]">{name}</p>
      <p className="text-white/40 text-sm mt-0.5">{role}</p>
    </div>
  );
}

export default TeamCard;
