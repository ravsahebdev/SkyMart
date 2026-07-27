import TeamCard from "./TeamCard";
import { team } from "../../data/about";

function TeamSection() {
  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h2 className="font-bold text-2xl text-center mb-8">Meet the Team</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((member) => (
          <TeamCard key={member.name} {...member} />
        ))}
      </div>
    </div>
  );
}

export default TeamSection;
