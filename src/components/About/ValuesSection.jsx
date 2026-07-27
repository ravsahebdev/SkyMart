import { Shield, Truck, Heart, Star } from "lucide-react";
import ValueCard from "./ValueCard";
import { values } from "../../data/about";

const iconMap = { shield: Shield, truck: Truck, heart: Heart, star: Star };

function ValuesSection() {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="font-bold text-2xl text-center mb-8">What We Stand For</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {values.map((v) => (
          <ValueCard key={v.title} icon={iconMap[v.icon]} title={v.title} desc={v.desc} />
        ))}
      </div>
    </div>
  );
}

export default ValuesSection;
