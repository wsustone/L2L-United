import { ArrowRight, Layers, Shield, Droplets } from "lucide-react";
import worldMapHero from "@/assets/world-map-hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${worldMapHero})` }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-white/80" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <img
            src="/images/L2LLogo.JPG"
            alt="L2L United Logo"
            className="h-64 w-auto mx-auto mt-8 mb-6 object-contain"
          />

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3a5c] mb-6 leading-tight">
            Global Building Solutions
          </h1>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <a href="#video-thermasteel" className="group relative p-8 rounded-xl border border-border bg-card hover:border-[#1a3a5c]/50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1a3a5c]/10 mb-5 group-hover:bg-[#1a3a5c]/20 transition-colors">
                <Layers size={24} className="text-[#1a3a5c]" />
              </div>
              <div className="text-xl font-bold text-[#1a3a5c] mb-2">ThermaSteel</div>
              <p className="text-sm text-muted-foreground leading-relaxed">Structural Insulated Panel System</p>
              <ArrowRight size={16} className="absolute top-8 right-8 text-muted-foreground/0 group-hover:text-[#1a3a5c] transition-all duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#video-ustucco" className="group relative p-8 rounded-xl border border-border bg-card hover:border-[#1a3a5c]/50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1a3a5c]/10 mb-5 group-hover:bg-[#1a3a5c]/20 transition-colors">
                <Shield size={24} className="text-[#1a3a5c]" />
              </div>
              <div className="text-xl font-bold text-[#1a3a5c] mb-2">UStucco</div>
              <p className="text-sm text-muted-foreground leading-relaxed">Fire & Water Proof Coatings</p>
              <ArrowRight size={16} className="absolute top-8 right-8 text-muted-foreground/0 group-hover:text-[#1a3a5c] transition-all duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#video-biopure" className="group relative p-8 rounded-xl border border-border bg-card hover:border-[#1a3a5c]/50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#1a3a5c]/10 mb-5 group-hover:bg-[#1a3a5c]/20 transition-colors">
                <Droplets size={24} className="text-[#1a3a5c]" />
              </div>
              <div className="text-xl font-bold text-[#1a3a5c] mb-2">Bio-Pure</div>
              <p className="text-sm text-muted-foreground leading-relaxed">Waste-Water Treatment Systems</p>
              <ArrowRight size={16} className="absolute top-8 right-8 text-muted-foreground/0 group-hover:text-[#1a3a5c] transition-all duration-300 group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
