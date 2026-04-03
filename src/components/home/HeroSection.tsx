import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Layers, Shield, Droplets } from "lucide-react";
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
            className="h-64 w-auto mx-auto mb-2 object-contain"
          />

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3a5c] mb-6 leading-tight">
            Global Building Solutions
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            L2L UNITED delivers comprehensive development solutions for ground-up 
            construction and utilities. From concept to completion, we transform 
            visions into lasting infrastructure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-base px-8 bg-[#1a3a5c] hover:bg-[#152d4a] text-white">
              <Link to="/programs">
                Explore Programs
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
            <a href="#video-thermasteel" className="group relative p-8 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <Layers size={24} className="text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground mb-2">ThermaSteel</div>
              <p className="text-sm text-muted-foreground leading-relaxed">Structural Insulated Panel System</p>
              <ArrowRight size={16} className="absolute top-8 right-8 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#video-ustucco" className="group relative p-8 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <Shield size={24} className="text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground mb-2">UStucco</div>
              <p className="text-sm text-muted-foreground leading-relaxed">Fire & Water Proof Coatings</p>
              <ArrowRight size={16} className="absolute top-8 right-8 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
            </a>
            <a href="#video-biopure" className="group relative p-8 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <Droplets size={24} className="text-primary" />
              </div>
              <div className="text-xl font-bold text-foreground mb-2">Bio-Pure</div>
              <p className="text-sm text-muted-foreground leading-relaxed">Waste-Water Treatment Systems</p>
              <ArrowRight size={16} className="absolute top-8 right-8 text-muted-foreground/0 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
