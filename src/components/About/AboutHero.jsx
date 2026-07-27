import { Zap } from "lucide-react";

function AboutHero() {
  return (
    <div className="text-center max-w-2xl mx-auto pt-4">
      <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Zap size={28} className="text-black fill-black" />
      </div>

      <h1 className="font-bold text-4xl lg:text-5xl mb-4">
        About <span className="text-lime-400">SkyMart</span>
      </h1>

      <p className="text-white/40 text-base lg:text-lg leading-relaxed">
        SkyMart is a next-generation e-commerce platform built to make online
        shopping fast, fair, and enjoyable — for everyone.
      </p>
    </div>
  );
}

export default AboutHero;
