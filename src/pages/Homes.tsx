import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Home, ArrowRight, Ruler, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import l2lHomesHero from "@/assets/l2l-homes-hero.png";

const homeModels = [
  {
    size: "500",
    name: "Compact Living",
    description: "Perfect for individuals or couples, maximizing efficiency in a cozy space.",
    bedrooms: 1,
    bathrooms: 1,
    path: "/homes/500-sqft",
  },
  {
    size: "850",
    name: "Starter Home",
    description: "Ideal for small families or those seeking extra space for a home office.",
    bedrooms: 2,
    bathrooms: 1,
    path: "/homes/850-sqft",
  },
  {
    size: "1100",
    name: "Family Essential",
    description: "Comfortable living for growing families with room to breathe.",
    bedrooms: 2,
    bathrooms: 2,
    path: "/homes/1100-sqft",
  },
  {
    size: "1350",
    name: "Family Plus",
    description: "Expanded living areas perfect for families who love to entertain.",
    bedrooms: 3,
    bathrooms: 2,
    path: "/homes/1350-sqft",
  },
  {
    size: "1650",
    name: "Premium Family",
    description: "Spacious design with dedicated areas for work, play, and relaxation.",
    bedrooms: 3,
    bathrooms: 2,
    path: "/homes/1650-sqft",
  },
  {
    size: "2300",
    name: "Executive",
    description: "Our largest model offering luxury amenities and generous living spaces.",
    bedrooms: 4,
    bathrooms: 3,
    path: "/homes/2300-sqft",
  },
];

const Homes = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${l2lHomesHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,47%,15%)]/90 to-[hsl(222,47%,20%)]/70" />
        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              L2L Homes
            </h1>
            <p className="text-xl text-white/90">
              Innovative, sustainable, and affordable homes built with ThermaSteel technology. 
              Choose from six thoughtfully designed models to fit your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Zap className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Energy Efficient</h3>
                <p className="text-muted-foreground">
                  R-40+ insulation rating means lower energy bills and year-round comfort.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Disaster Resistant</h3>
                <p className="text-muted-foreground">
                  Engineered to withstand Category 5 hurricanes and seismic activity.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Ruler className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Quick Assembly</h3>
                <p className="text-muted-foreground">
                  Modular design allows for 60% faster construction than traditional methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Choose Your Model
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeModels.map((model) => (
              <div
                key={model.size}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-colors"
              >
                <div className="h-48 bg-secondary/50 flex items-center justify-center">
                  <Home className="h-20 w-20 text-primary/30" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{model.name}</h3>
                    <span className="text-primary font-bold">{model.size} sqft</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{model.description}</p>
                  <div className="flex gap-4 mb-6 text-sm text-muted-foreground">
                    <span>{model.bedrooms} Bed</span>
                    <span>•</span>
                    <span>{model.bathrooms} Bath</span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={model.path}>
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-[hsl(222,47%,15%)] rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Dream Home?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Contact our team to discuss your project requirements and learn how L2L Homes 
              can provide the perfect solution for your housing needs.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Homes;
