import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Droplets, Users, Building2, Tent, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const models = [
  {
    name: "BP-500",
    capacity: "500 GPD",
    description: "Residential water treatment system perfect for single-family homes.",
    users: "1-4 people",
    applications: ["Single homes", "Small offices", "Guest houses"],
  },
  {
    name: "BP-1500",
    capacity: "1,500 GPD",
    description: "Multi-family and small commercial water treatment solution.",
    users: "5-15 people",
    applications: ["Multi-family", "Small businesses", "Clinics"],
  },
  {
    name: "BP-5000",
    capacity: "5,000 GPD",
    description: "Community-scale water treatment for schools, hospitals, and villages.",
    users: "50-100 people",
    applications: ["Schools", "Hospitals", "Villages"],
  },
  {
    name: "BP-10000",
    capacity: "10,000 GPD",
    description: "Large community water treatment system.",
    users: "100-200 people",
    applications: ["Large villages", "Camps", "Resorts"],
  },
  {
    name: "BP-25000",
    capacity: "25,000 GPD",
    description: "Municipal-scale water treatment for towns and developments.",
    users: "500+ people",
    applications: ["Towns", "Developments", "Industrial"],
  },
  {
    name: "BP-MOBILE",
    capacity: "2,000 GPD",
    description: "Rapid-deployment emergency water treatment unit.",
    users: "Variable",
    applications: ["Disaster relief", "Military", "Events"],
  },
];

const ProductsBioPure = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Bio-Pure Models
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Complete water treatment systems available in multiple capacities to serve 
                any application—from single homes to entire communities.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Request Quote</Link>
              </Button>
            </div>
            <div className="h-80 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Droplets className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Available Models
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {models.map((model) => (
              <div key={model.name} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{model.name}</h3>
                  <span className="text-primary font-bold">{model.capacity}</span>
                </div>
                <p className="text-muted-foreground mb-4">{model.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{model.users}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {model.applications.map((app) => (
                    <span
                      key={app}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Applications
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Residential</h3>
              <p className="text-sm text-muted-foreground">
                Single and multi-family homes, apartments, and housing developments
              </p>
            </div>
            <div className="text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Commercial</h3>
              <p className="text-sm text-muted-foreground">
                Hotels, resorts, restaurants, and office buildings
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Schools, hospitals, villages, and municipal water systems
              </p>
            </div>
            <div className="text-center">
              <Tent className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Emergency</h3>
              <p className="text-sm text-muted-foreground">
                Disaster relief, refugee camps, and military operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Standard Features</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Multi-stage sediment filtration (down to 1 micron)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Activated carbon for taste and odor removal
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    UV sterilization (99.99% pathogen elimination)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Automatic backwash and regeneration
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Remote monitoring and control (optional)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Solar power compatible
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Optional Upgrades</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Reverse osmosis for desalination
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Iron and manganese removal
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Arsenic and fluoride treatment
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Ozone disinfection
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    Rainwater harvesting integration
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
              Find the Right System for Your Needs
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our team can help you select and configure the perfect Bio-Pure system.
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

export default ProductsBioPure;
