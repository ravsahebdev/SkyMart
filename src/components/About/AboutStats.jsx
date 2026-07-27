import { Package, Users, Star, Truck } from "lucide-react";
import AboutStatCard from "./AboutStatCard";
import { aboutStats } from "../../data/about";

// data/about.js me sirf icon ka naam (string) hai, yahan actual component se map karte hain
const iconMap = { package: Package, users: Users, star: Star, truck: Truck };

function AboutStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
      {aboutStats.map((stat) => (
        <AboutStatCard key={stat.label} icon={iconMap[stat.icon]} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}

export default AboutStats;
