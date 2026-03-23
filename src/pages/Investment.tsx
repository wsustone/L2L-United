import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, Globe, Building2, Layers, DollarSign, BarChart3, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Investment = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Investment Opportunities
            </h1>
            <p className="text-xl text-muted-foreground">
              Partner with L2L United to capitalize on the global affordable housing opportunity 
              while making a meaningful social impact.
            </p>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Approach</h2>
            <p className="text-muted-foreground">
              L2L United offers investors a unique opportunity to participate in the global 
              affordable housing market through our vertically integrated approach. Our strategy 
              combines proprietary technology, strategic partnerships, and deep market expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Growth-Focused</h3>
              <p className="text-muted-foreground">
                We target high-growth markets with significant housing deficits, positioning 
                ourselves to capture substantial market share.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Risk-Managed</h3>
              <p className="text-muted-foreground">
                Diversified geographic presence and multiple revenue streams provide natural 
                hedging against regional fluctuations.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Partnership-Driven</h3>
              <p className="text-muted-foreground">
                We work with local governments, NGOs, and development organizations to 
                secure contracts and ensure project success.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Globally Scalable</h3>
              <p className="text-muted-foreground">
                Our modular building system can be rapidly deployed anywhere, allowing quick 
                response to market opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section id="structure" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Investment Structure</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Flexible investment options designed to meet diverse investor needs and objectives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-lg p-8 border border-border">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Project-Level Investment</h3>
              <p className="text-muted-foreground mb-4">
                Direct investment in specific housing development projects with defined 
                timelines and return profiles.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Targeted returns: 15-20% IRR</li>
                <li>• Investment horizon: 2-4 years</li>
                <li>• Minimum investment: $250,000</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Layers className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Portfolio Investment</h3>
              <p className="text-muted-foreground mb-4">
                Diversified exposure across multiple projects and geographies through our 
                managed investment fund.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Targeted returns: 12-18% IRR</li>
                <li>• Investment horizon: 5-7 years</li>
                <li>• Minimum investment: $500,000</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Equity Partnership</h3>
              <p className="text-muted-foreground mb-4">
                Strategic partnership opportunities for institutional investors seeking 
                significant ownership stakes.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Customized terms</li>
                <li>• Board representation options</li>
                <li>• Minimum investment: $5,000,000</li>
              </ul>
            </div>
          </div>

          {/* Investment Process */}
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Investment Process</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Initial Consultation</h4>
              <p className="text-sm text-muted-foreground">
                Meet with our team to discuss objectives and opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Due Diligence</h4>
              <p className="text-sm text-muted-foreground">
                Review detailed documentation and financial models
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Structuring</h4>
              <p className="text-sm text-muted-foreground">
                Work with legal counsel to finalize investment terms
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Partnership</h4>
              <p className="text-sm text-muted-foreground">
                Close investment and begin receiving updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis Section */}
      <section id="market-analysis" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6">Market Analysis</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              The world faces an unprecedented housing shortage. By 2030, an estimated 3 billion 
              people will need access to adequate housing—a challenge that represents both a 
              humanitarian imperative and a significant investment opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center bg-card rounded-lg p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-2">1.6B</div>
              <p className="text-muted-foreground">People lacking adequate housing</p>
            </div>
            <div className="text-center bg-card rounded-lg p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-2">$1.6T</div>
              <p className="text-muted-foreground">Annual investment needed</p>
            </div>
            <div className="text-center bg-card rounded-lg p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-2">96M</div>
              <p className="text-muted-foreground">New homes needed annually</p>
            </div>
            <div className="text-center bg-card rounded-lg p-6 border border-border">
              <div className="text-4xl font-bold text-primary mb-2">6.2%</div>
              <p className="text-muted-foreground">Modular construction CAGR</p>
            </div>
          </div>

          {/* Regional Markets */}
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">Regional Opportunities</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-lg p-8 border border-border">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-3">Sub-Saharan Africa</h4>
              <p className="text-muted-foreground mb-4">
                Fastest-growing housing market with 4.5% annual urban population growth.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Size</span>
                  <span className="text-foreground">$320B+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">L2L Presence</span>
                  <span className="text-primary">8 Countries</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-3">Latin America</h4>
              <p className="text-muted-foreground mb-4">
                42 million unit housing deficit with strong government support.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Size</span>
                  <span className="text-foreground">$280B+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">L2L Presence</span>
                  <span className="text-primary">4 Countries</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <Globe className="h-10 w-10 text-primary mb-4" />
              <h4 className="text-xl font-semibold text-foreground mb-3">Southeast Asia</h4>
              <p className="text-muted-foreground mb-4">
                Rapidly urbanizing population with growing middle class demand.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Market Size</span>
                  <span className="text-foreground">$450B+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">L2L Presence</span>
                  <span className="text-primary">3 Countries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Competitive Advantages */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Competitive Advantages</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Proprietary ThermaSteel technology with 20+ years of proven performance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    40% cost reduction vs. traditional construction methods
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    60% faster construction timelines
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Superior energy efficiency (R-40+ insulation rating)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <span className="text-muted-foreground">
                    Disaster-resistant construction (Category 5 hurricane rated)
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h4 className="text-xl font-semibold text-foreground mb-6">Historical Performance</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Average Project IRR</span>
                    <span className="text-foreground font-semibold">18.5%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Capital Deployed</span>
                    <span className="text-foreground font-semibold">$125M+</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "70%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Projects Completed</span>
                    <span className="text-foreground font-semibold">45+</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full">
                    <div className="h-2 bg-primary rounded-full" style={{ width: "60%" }} />
                  </div>
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
              Ready to Invest?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contact our investment team to learn more about current opportunities and how 
              you can partner with L2L United.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Investment;
