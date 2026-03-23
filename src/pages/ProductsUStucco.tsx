import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Palette, Shield, Sun, Droplets, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsUStucco = () => {
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
                U-Stucco System
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Our proprietary exterior finishing system designed specifically for ThermaSteel 
                construction—combining durability, beauty, and easy application.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Request Quote</Link>
              </Button>
            </div>
            <div className="h-80 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Palette className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* System Components */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            System Components
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">U-Stucco Primer</h3>
              <p className="text-muted-foreground mb-4">
                Specially formulated primer that bonds directly to ThermaSteel panels, 
                creating the perfect substrate for the finish coat.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Excellent adhesion</li>
                <li>• Moisture barrier</li>
                <li>• Quick drying</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">U-Stucco Base Coat</h3>
              <p className="text-muted-foreground mb-4">
                Polymer-modified cementitious base coat with embedded fiberglass mesh 
                for crack resistance and impact protection.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High impact resistance</li>
                <li>• Crack prevention</li>
                <li>• Weather resistant</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">U-Stucco Finish</h3>
              <p className="text-muted-foreground mb-4">
                Premium acrylic finish coat available in hundreds of colors and multiple 
                textures to achieve any architectural style.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• UV stable colors</li>
                <li>• Self-cleaning</li>
                <li>• Breathable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Textures */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Available Textures
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-32 bg-card rounded-lg border border-border mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Smooth</h3>
              <p className="text-sm text-muted-foreground">Modern, clean aesthetic</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-card rounded-lg border border-border mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Fine Sand</h3>
              <p className="text-sm text-muted-foreground">Subtle texture, classic look</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-card rounded-lg border border-border mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Medium Sand</h3>
              <p className="text-sm text-muted-foreground">Traditional stucco appearance</p>
            </div>
            <div className="text-center">
              <div className="h-32 bg-card rounded-lg border border-border mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Rustic</h3>
              <p className="text-sm text-muted-foreground">Mediterranean style</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Why U-Stucco?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Droplets className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Water Resistant</h3>
                    <p className="text-muted-foreground">
                      Advanced polymer technology repels water while allowing the wall to breathe.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Sun className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">UV Stable</h3>
                    <p className="text-muted-foreground">
                      Colors remain vibrant for years without fading, chalking, or discoloration.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Crack Resistant</h3>
                    <p className="text-muted-foreground">
                      Flexible formulation accommodates building movement and temperature changes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Palette className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Design Flexibility</h3>
                    <p className="text-muted-foreground">
                      Hundreds of colors and textures to match any architectural vision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Technical Data</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Coverage</span>
                  <span className="text-foreground">100-150 sq ft/gal</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Dry Time</span>
                  <span className="text-foreground">4-6 hours</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Full Cure</span>
                  <span className="text-foreground">28 days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Temperature Range</span>
                  <span className="text-foreground">40°F - 100°F</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Warranty</span>
                  <span className="text-foreground">10 Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Order U-Stucco Products
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact our team for product specifications, color charts, and pricing.
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

export default ProductsUStucco;
