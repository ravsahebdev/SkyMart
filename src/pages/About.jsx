import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AboutHero from "../components/About/AboutHero";
import AboutStats from "../components/About/AboutStats";
import OurStory from "../components/About/OurStory";
import ValuesSection from "../components/About/ValuesSection";
import TeamSection from "../components/About/TeamSection";
import CTASection from "../components/About/CTASection";

function About() {
  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />

      <div className="px-6 lg:px-10 py-12 max-w-[1440px] mx-auto">
        <AboutHero />
        <AboutStats />
        <OurStory />
        <ValuesSection />
        <TeamSection />
        <CTASection />
      </div>

      <Footer />
    </div>
  );
}

export default About;
