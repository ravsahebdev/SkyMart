import { Truck, Shield, Tag } from "lucide-react";
import FeatureCard from "./FeatureCard";

const perks = [
  { icon: Truck, title: "Fast Delivery", desc: "Same-day on select items" },
  { icon: Shield, title: "Secure Payments", desc: "100% encrypted checkout" },
  { icon: Tag, title: "Best Prices", desc: "Price-match guarantee" },
];

function FeaturesSection() {
  return (
    <div className="grid sm:grid-cols-3 gap-4 mt-12">
      {perks.map((perk) => (
        <FeatureCard key={perk.title} {...perk} />
      ))}
    </div>
  );
}

export default FeaturesSection;
