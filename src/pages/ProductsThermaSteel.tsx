import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Building2, Zap, Shield, Thermometer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductsThermaSteel = () => {
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
                ThermaSteel Panels
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Revolutionary structural insulated panels that combine the strength of steel 
                with superior thermal insulation for faster, stronger, more efficient construction.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Request Quote</Link>
              </Button>
            </div>
            <div className="h-80 bg-secondary/50 rounded-lg flex items-center justify-center">
              <Building2 className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Panel Types */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Panel Options
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-2">4" Wall Panel</h3>
              <div className="text-3xl font-bold text-primary mb-4">R-26</div>
              <p className="text-muted-foreground mb-4">
                Ideal for interior walls and moderate climate applications.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Overall thickness: 4.5"</li>
                <li>• EPS core: 4"</li>
                <li>• Steel gauge: 20</li>
                <li>• Weight: 2.5 lbs/sq ft</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-primary border-2">
              <div className="text-xs font-semibold text-primary mb-2">MOST POPULAR</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">6" Wall Panel</h3>
              <div className="text-3xl font-bold text-primary mb-4">R-40</div>
              <p className="text-muted-foreground mb-4">
                Our most versatile panel, suitable for most residential and commercial applications.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Overall thickness: 6.5"</li>
                <li>• EPS core: 6"</li>
                <li>• Steel gauge: 18</li>
                <li>• Weight: 3 lbs/sq ft</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-2">8" Wall Panel</h3>
              <div className="text-3xl font-bold text-primary mb-4">R-52</div>
              <p className="text-muted-foreground mb-4">
                Maximum insulation for extreme climates and cold storage applications.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Overall thickness: 8.5"</li>
                <li>• EPS core: 8"</li>
                <li>• Steel gauge: 16</li>
                <li>• Weight: 3.5 lbs/sq ft</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Energy Efficient</h3>
              <p className="text-sm text-muted-foreground">
                Up to 60% reduction in heating and cooling costs
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Disaster Resistant</h3>
              <p className="text-sm text-muted-foreground">
                Rated for 150+ MPH winds and seismic zones
              </p>
            </div>
            <div className="text-center">
              <Thermometer className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Thermal Bridging</h3>
              <p className="text-sm text-muted-foreground">
                Continuous insulation eliminates cold spots
              </p>
            </div>
            <div className="text-center">
              <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Rapid Assembly</h3>
              <p className="text-sm text-muted-foreground">
                60% faster than traditional construction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Technical Specifications</h2>
              <div className="bg-card rounded-lg p-8 border border-border">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Steel Type</span>
                    <span className="text-foreground">Galvanized G90</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">EPS Density</span>
                    <span className="text-foreground">1.5 lb/cu ft</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Fire Rating</span>
                    <span className="text-foreground">Class A (ASTM E84)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Wind Load</span>
                    <span className="text-foreground">150+ MPH</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Termite Resistance</span>
                    <span className="text-foreground">100% Resistant</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Mold Resistance</span>
                    <span className="text-foreground">100% Resistant</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Certifications</h2>
              <div className="bg-card rounded-lg p-8 border border-border">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <span className="text-muted-foreground">
                      ICC-ES Evaluation Report (ESR)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <span className="text-muted-foreground">
                      Florida Product Approval (FL)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <span className="text-muted-foreground">
                      Miami-Dade County NOA
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <span className="text-muted-foreground">
                      ASTM E119 Fire Test Certified
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <span className="text-muted-foreground">
                      ASTM E84 Surface Burning Characteristics
                    </span>
                  </li>
                </ul>
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
              Order ThermaSteel Panels
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact our team for pricing, lead times, and technical support.
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

export default ProductsThermaSteel;
