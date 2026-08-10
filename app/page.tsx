import Navbar from "./components/Navbar";
import Globe from "./components/Globe";
import Hero from "./components/Hero";
import DangerSection from "./components/DangerSection";
import SolutionsSection from "./components/SolutionsSection";
import SourcesSection from "./components/SourcesSection";
import JoinCommunity from "./components/JoinCommunity";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Background SVG Globe & Vignette & Noise overlays */}
      <Globe />
      <div className="bg-vignette" />
      <div className="noise" />

      {/* Page Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <DangerSection />
        <SolutionsSection />
        <SourcesSection />
        <JoinCommunity />
        <Footer />
      </div>
    </main>
  );
}
