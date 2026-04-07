import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Building2, Droplets, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: Building2,
    title: "L2L Systems by ThermaSteel",
    description: "Revolutionary structural insulated panel system that combines steel framing with foam insulation for superior strength, energy efficiency, and disaster resistance.",
    path: "/solutions/thermasteel",
    features: ["R-40+ Insulation", "Hurricane Resistant", "Fire Resistant", "Mold Resistant"],
  },
  {
    icon: Droplets,
    title: "Bio-Pure Water Solutions",
    description: "Advanced water purification and treatment systems designed for residential, commercial, and community applications in any environment.",
    path: "/solutions/bio-pure",
    features: ["Potable Water Systems", "Wastewater Treatment", "Rainwater Harvesting", "UV Purification"],
  },
  {
    icon: Palette,
    title: "Exterior Applications",
    description: "Complete exterior finishing solutions including our proprietary U-Stucco system, designed to complement ThermaSteel construction.",
    path: "/solutions/exterior",
    features: ["U-Stucco Systems", "Decorative Finishes", "Weather Protection", "Low Maintenance"],
  },
];

const products = [
  {
    icon: Building2,
    title: "ThermaSteel Panels",
    description: "Structural insulated panels combining steel framing with EPS foam for superior strength, insulation, and rapid construction.",
    path: "/products/thermasteel-panels",
    highlights: ["R-40+ Insulation", "Category 5 Hurricane Rated", "Fire & Mold Resistant"],
  },
  {
    icon: Droplets,
    title: "Bio-Pure Models",
    description: "Complete water treatment systems available in various capacities for residential, commercial, and community applications.",
    path: "/products/bio-pure-models",
    highlights: ["Potable Water Systems", "Wastewater Treatment", "Emergency Response Units"],
  },
  {
    icon: Palette,
    title: "U-Stucco",
    description: "Our proprietary exterior finishing system designed for durability, beauty, and compatibility with ThermaSteel construction.",
    path: "/products/u-stucco",
    highlights: ["Crack Resistant", "UV Stable Colors", "Low Maintenance"],
  },
];

const Solutions = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 ">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Global Building Solutions
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive construction solutions designed for durability, sustainability, 
              and rapid deployment anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <solution.icon className="h-12 w-12 text-primary mb-4" />
                  <h2 className="text-3xl font-bold text-foreground mb-4">{solution.title}</h2>
                  <p className="text-muted-foreground mb-6">{solution.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {solution.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button asChild>
                    <Link to={solution.path}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className={`h-80 bg-secondary/50 rounded-lg flex items-center justify-center ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}>
                  <solution.icon className="h-32 w-32 text-primary/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Building Products */}
      <section className="py-20 pt-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">  Building Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Innovative building materials and systems designed for performance, 
              sustainability, and ease of installation.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.title}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-colors"
              >
                <div className="h-48 bg-secondary/50 flex items-center justify-center">
                  <product.icon className="h-20 w-20 text-primary/30" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link to={product.path}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 pt-32">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose L2L Global Building Solutions?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <p className="text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Structures Built</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">60%</div>
              <p className="text-muted-foreground">Faster Construction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact our team to discuss how our global building solutions can meet your needs.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Solutions;
