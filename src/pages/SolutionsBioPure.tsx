import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Droplets, Shield, Leaf, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionsBioPure = () => {
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
                Bio-Pure Water Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Advanced water purification and treatment systems designed to provide clean, 
                safe water in any environment—from remote villages to urban developments.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Request Information</Link>
              </Button>
            </div>
            <div className="h-80 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Droplets className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Complete Water Management Solutions
            </h2>
            <p className="text-muted-foreground">
              Bio-Pure offers a comprehensive range of water treatment solutions designed to 
              address the full spectrum of water management needs, from source to consumption.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <Droplets className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Potable Water Systems</h3>
              <p className="text-muted-foreground mb-4">
                Transform any water source into safe, clean drinking water with our advanced 
                filtration and purification systems.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multi-stage filtration</li>
                <li>• UV sterilization</li>
                <li>• Mineral balancing</li>
                <li>• Capacity: 500-50,000+ GPD</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Wastewater Treatment</h3>
              <p className="text-muted-foreground mb-4">
                Environmentally responsible wastewater treatment systems for residential, 
                commercial, and community applications.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Aerobic treatment</li>
                <li>• Constructed wetlands</li>
                <li>• Water recycling</li>
                <li>• Zero-discharge options</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Rainwater Harvesting</h3>
              <p className="text-muted-foreground mb-4">
                Capture, store, and utilize rainwater for various applications, reducing 
                dependence on municipal water supplies.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Collection systems</li>
                <li>• Storage tanks</li>
                <li>• First-flush diverters</li>
                <li>• Treatment for potable use</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Emergency Response</h3>
              <p className="text-muted-foreground mb-4">
                Rapid-deployment water treatment units for disaster relief and emergency 
                situations.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Portable units</li>
                <li>• Solar-powered options</li>
                <li>• Quick setup (&lt; 1 hour)</li>
                <li>• Containerized systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Technology</h2>
              <p className="text-muted-foreground mb-6">
                Bio-Pure systems utilize a multi-barrier approach to water treatment, combining 
                physical, chemical, and biological processes to ensure the highest water quality.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Sediment filtration removes particles down to 1 micron
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Activated carbon eliminates organic compounds and chlorine
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    UV sterilization destroys 99.99% of harmful microorganisms
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Reverse osmosis for desalination and heavy metal removal
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Certifications & Standards</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">NSF/ANSI 61 Certified Components</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">WHO Drinking Water Guidelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">EPA Safe Drinking Water Act Compliant</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">ISO 9001:2015 Quality Management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Need a Water Solution?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our team can design a custom water treatment solution for your specific needs.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsBioPure;
