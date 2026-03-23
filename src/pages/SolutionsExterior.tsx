import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Palette, Shield, Sun, Droplets, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SolutionsExterior = () => {
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
                Exterior Applications
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Complete exterior finishing solutions designed to protect, beautify, and 
                enhance any structure. Our systems are engineered to withstand the elements 
                while providing lasting aesthetic appeal.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Request Information</Link>
              </Button>
            </div>
            <div className="h-80 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Palette className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Exterior Solutions
            </h2>
            <p className="text-muted-foreground">
              From innovative stucco systems to decorative finishes, our exterior applications 
              provide the perfect combination of durability and design flexibility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <Palette className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">U-Stucco Systems</h3>
              <p className="text-muted-foreground mb-4">
                Our proprietary U-Stucco system provides a seamless, durable finish that 
                resists cracking, fading, and moisture intrusion.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/products/u-stucco">Learn More</Link>
              </Button>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Sun className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Decorative Finishes</h3>
              <p className="text-muted-foreground mb-4">
                A wide range of textures, colors, and patterns to achieve any architectural 
                style—from modern minimalist to classic Mediterranean.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Smooth finishes</li>
                <li>• Sand textures</li>
                <li>• Stone effects</li>
                <li>• Custom colors</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Protective Coatings</h3>
              <p className="text-muted-foreground mb-4">
                Advanced coatings that provide an extra layer of protection against UV rays, 
                moisture, and environmental pollutants.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Elastomeric coatings</li>
                <li>• Anti-graffiti treatments</li>
                <li>• Waterproofing</li>
                <li>• Fire retardants</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose Our Exterior Solutions?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Droplets className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Water Resistant</h3>
              <p className="text-sm text-muted-foreground">
                Advanced formulations repel water while allowing structures to breathe
              </p>
            </div>
            <div className="text-center">
              <Sun className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">UV Stable</h3>
              <p className="text-sm text-muted-foreground">
                Colors stay vibrant for years without fading or chalking
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Crack Resistant</h3>
              <p className="text-sm text-muted-foreground">
                Flexible formulations accommodate building movement
              </p>
            </div>
            <div className="text-center">
              <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Low Maintenance</h3>
              <p className="text-sm text-muted-foreground">
                Easy to clean and maintain, saving time and money
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Application Process</h2>
              <p className="text-muted-foreground mb-6">
                Our trained applicators follow a rigorous process to ensure optimal results 
                and long-lasting performance.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Surface Preparation</h3>
                    <p className="text-muted-foreground text-sm">
                      Cleaning, repair, and priming to ensure proper adhesion
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Base Coat Application</h3>
                    <p className="text-muted-foreground text-sm">
                      Polymer-modified base coat with embedded reinforcing mesh
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Finish Coat</h3>
                    <p className="text-muted-foreground text-sm">
                      Decorative finish in your choice of color and texture
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Quality Inspection</h3>
                    <p className="text-muted-foreground text-sm">
                      Final inspection to ensure consistency and quality
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Warranty Coverage</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    10-year warranty on finish coat adhesion
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    5-year color fade guarantee
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Lifetime warranty on ThermaSteel compatibility
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Full material and labor coverage
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Transform Your Building's Exterior
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your exterior finishing needs and explore our full range of options.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsExterior;
