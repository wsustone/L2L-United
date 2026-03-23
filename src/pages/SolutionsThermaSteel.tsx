import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Building2, Zap, Shield, Wind, Thermometer, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionsThermaSteel = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <Link
            to="/solutions"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Solutions
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                L2L Systems by ThermaSteel
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                The revolutionary structural insulated panel system that's changing the way 
                the world builds. Stronger, faster, and more efficient than traditional construction.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Request Information</Link>
              </Button>
            </div>
            <div className="h-80 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Building2 className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* What is ThermaSteel */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              What is ThermaSteel?
            </h2>
            <p className="text-muted-foreground">
              ThermaSteel is a patented structural insulated panel (SIP) system that combines 
              a steel frame with expanded polystyrene (EPS) foam insulation. This innovative 
              design creates a building envelope that is stronger, more energy-efficient, and 
              faster to construct than traditional building methods.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Superior Insulation</h3>
              <p className="text-muted-foreground">
                R-40+ insulation rating provides exceptional energy efficiency, reducing 
                heating and cooling costs by up to 60%.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Disaster Resistant</h3>
              <p className="text-muted-foreground">
                Engineered to withstand Category 5 hurricanes, earthquakes, and other 
                extreme weather conditions.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Rapid Assembly</h3>
              <p className="text-muted-foreground">
                Modular design allows for 60% faster construction compared to traditional 
                building methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Technical Specifications
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Panel Specifications</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Panel Thickness</span>
                  <span className="text-foreground">4", 6", or 8"</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">R-Value</span>
                  <span className="text-foreground">R-26 to R-45+</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Steel Gauge</span>
                  <span className="text-foreground">20-16 gauge</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Fire Rating</span>
                  <span className="text-foreground">Class A</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Wind Load</span>
                  <span className="text-foreground">150+ MPH</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Performance Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Eliminates thermal bridging for consistent temperature control
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Wind className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Airtight construction reduces energy loss and improves air quality
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Mold and termite resistant for long-lasting durability
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Reduces HVAC system size requirements by up to 40%
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Applications
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Residential</h3>
              <p className="text-sm text-muted-foreground">Single-family homes and multi-unit developments</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Commercial</h3>
              <p className="text-sm text-muted-foreground">Offices, retail, and hospitality buildings</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Industrial</h3>
              <p className="text-sm text-muted-foreground">Warehouses, cold storage, and manufacturing</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Institutional</h3>
              <p className="text-sm text-muted-foreground">Schools, healthcare, and government buildings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Build with ThermaSteel?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact our team to learn how ThermaSteel can transform your next project.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsThermaSteel;
