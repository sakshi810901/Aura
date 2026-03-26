function XPBar({ xp, level }) {
  const progressPercent = (xp % 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-sm font-bold mb-2 text-purple-200 uppercase tracking-widest">
        <span>Level {level}</span>
        <span className="text-emerald-300">{xp} XP</span>
      </div>
      <div className="w-full bg-slate-900/80 rounded-full h-4 border border-slate-700 overflow-hidden shadow-inner p-0.5">
        <div 
          className="bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(139,92,246,0.6)] relative overflow-hidden"
          style={{ width: `${progressPercent}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      </div>
      <div className="text-xs text-right mt-1.5 text-slate-400 font-medium tracking-wide">
        {100 - progressPercent} XP to Next Level
      </div>
    </div>
  );
}

export default XPBar;
