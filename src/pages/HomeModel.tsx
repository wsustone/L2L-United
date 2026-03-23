import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Home, Bed, Bath, Ruler, Zap, Shield, Wind, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const modelData: Record<string, {
  size: string;
  name: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  specifications: { label: string; value: string }[];
}> = {
  "500-sqft": {
    size: "500",
    name: "Compact Living",
    description: "The 500 sqft Compact Living model is designed for individuals or couples who value efficiency and simplicity. Every square foot is optimized for comfortable living, featuring an open floor plan that maximizes natural light and flow.",
    bedrooms: 1,
    bathrooms: 1,
    features: [
      "Open-concept living and kitchen area",
      "Efficient galley-style kitchen with modern appliances",
      "Spacious bedroom with built-in closet",
      "Full bathroom with contemporary fixtures",
      "Covered entry porch",
      "Optional solar panel package",
    ],
    specifications: [
      { label: "Total Area", value: "500 sq ft" },
      { label: "Bedrooms", value: "1" },
      { label: "Bathrooms", value: "1" },
      { label: "Ceiling Height", value: "9 ft" },
      { label: "Foundation", value: "Slab or Pier" },
      { label: "Roof Type", value: "Metal Standing Seam" },
    ],
  },
  "850-sqft": {
    size: "850",
    name: "Starter Home",
    description: "The 850 sqft Starter Home offers the perfect balance of space and affordability. Ideal for small families or those needing a dedicated home office, this model features two bedrooms and a comfortable living area.",
    bedrooms: 2,
    bathrooms: 1,
    features: [
      "Spacious open living room",
      "Full kitchen with breakfast bar",
      "Master bedroom with walk-in closet",
      "Second bedroom/office space",
      "Full bathroom with tub/shower combo",
      "Front and rear porches",
    ],
    specifications: [
      { label: "Total Area", value: "850 sq ft" },
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "1" },
      { label: "Ceiling Height", value: "9 ft" },
      { label: "Foundation", value: "Slab or Pier" },
      { label: "Roof Type", value: "Metal Standing Seam" },
    ],
  },
  "1100-sqft": {
    size: "1100",
    name: "Family Essential",
    description: "The 1100 sqft Family Essential model provides comfortable living for growing families. With two bedrooms and two full bathrooms, this design offers privacy and convenience for everyone.",
    bedrooms: 2,
    bathrooms: 2,
    features: [
      "Large open-concept living and dining area",
      "Full kitchen with island",
      "Master suite with en-suite bathroom",
      "Second bedroom with nearby bathroom",
      "Utility/laundry room",
      "Covered front porch and rear patio",
    ],
    specifications: [
      { label: "Total Area", value: "1100 sq ft" },
      { label: "Bedrooms", value: "2" },
      { label: "Bathrooms", value: "2" },
      { label: "Ceiling Height", value: "9 ft" },
      { label: "Foundation", value: "Slab or Pier" },
      { label: "Roof Type", value: "Metal Standing Seam" },
    ],
  },
  "1350-sqft": {
    size: "1350",
    name: "Family Plus",
    description: "The 1350 sqft Family Plus model is perfect for families who love to entertain. Three bedrooms and expanded living areas provide room for everyone to spread out and enjoy.",
    bedrooms: 3,
    bathrooms: 2,
    features: [
      "Expansive living room with vaulted ceilings",
      "Gourmet kitchen with pantry",
      "Master suite with walk-in closet and en-suite",
      "Two additional bedrooms",
      "Full guest bathroom",
      "Wraparound porch",
    ],
    specifications: [
      { label: "Total Area", value: "1350 sq ft" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2" },
      { label: "Ceiling Height", value: "10 ft" },
      { label: "Foundation", value: "Slab or Pier" },
      { label: "Roof Type", value: "Metal Standing Seam" },
    ],
  },
  "1650-sqft": {
    size: "1650",
    name: "Premium Family",
    description: "The 1650 sqft Premium Family model offers spacious design with dedicated areas for work, play, and relaxation. Perfect for families who need room to grow and thrive.",
    bedrooms: 3,
    bathrooms: 2,
    features: [
      "Open floor plan with defined living zones",
      "Chef's kitchen with premium appliances",
      "Luxurious master suite",
      "Two spacious secondary bedrooms",
      "Dedicated home office or flex space",
      "Covered outdoor living area",
    ],
    specifications: [
      { label: "Total Area", value: "1650 sq ft" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "2" },
      { label: "Ceiling Height", value: "10 ft" },
      { label: "Foundation", value: "Slab or Pier" },
      { label: "Roof Type", value: "Metal Standing Seam" },
    ],
  },
  "2300-sqft": {
    size: "2300",
    name: "Executive",
    description: "The 2300 sqft Executive model is our largest and most luxurious offering. Four bedrooms, three bathrooms, and generous living spaces make this the perfect home for those who demand the best.",
    bedrooms: 4,
    bathrooms: 3,
    features: [
      "Grand open living and dining areas",
      "Gourmet kitchen with large island",
      "Primary suite with spa bathroom",
      "Three additional bedrooms",
      "Bonus room/media room",
      "Two-car garage option",
    ],
    specifications: [
      { label: "Total Area", value: "2300 sq ft" },
      { label: "Bedrooms", value: "4" },
      { label: "Bathrooms", value: "3" },
      { label: "Ceiling Height", value: "10 ft" },
      { label: "Foundation", value: "Slab or Pier" },
      { label: "Roof Type", value: "Metal Standing Seam" },
    ],
  },
};

const HomeModel = () => {
  const { model } = useParams<{ model: string }>();
  const data = model ? modelData[model] : null;

  if (!data) {
    return (
      <Layout>
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Model Not Found</h1>
            <p className="text-muted-foreground mb-8">The home model you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/homes">View All Models</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <Link
            to="/homes"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Models
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-primary font-semibold mb-2">{data.size} sqft</div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {data.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{data.description}</p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{data.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-primary" />
                  <span className="text-foreground">{data.bathrooms} Bathrooms</span>
                </div>
              </div>
            </div>
            <div className="h-80 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Home className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Features</h2>
              <ul className="space-y-4">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Specifications</h2>
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="space-y-4">
                  {data.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="text-foreground font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ThermaSteel Benefits */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Built with ThermaSteel Technology
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">R-40+ Insulation</h3>
              <p className="text-sm text-muted-foreground">Superior energy efficiency</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Category 5 Rated</h3>
              <p className="text-sm text-muted-foreground">Hurricane resistant</p>
            </div>
            <div className="text-center">
              <Wind className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">150 MPH Winds</h3>
              <p className="text-sm text-muted-foreground">Extreme weather protection</p>
            </div>
            <div className="text-center">
              <Ruler className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">60% Faster</h3>
              <p className="text-sm text-muted-foreground">Quick construction time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Interested in the {data.name}?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact our team to learn more about pricing, customization options, and availability.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Request Information</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomeModel;
