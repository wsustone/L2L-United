import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Building2, Zap, Shield, Wind, Clock, Leaf, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const keyBenefits = [
  {
    icon: Clock,
    title: "30–50% Faster Construction",
    description: "Accelerated timelines through precision offsite manufacturing and streamlined field installation.",
  },
  {
    icon: Zap,
    title: "Superior Energy Efficiency",
    description: "Integrated EPS core insulation with R-values ranging from approximately R-28 to R-61.",
  },
  {
    icon: Shield,
    title: "Resilient by Design",
    description: "Engineered for high wind (up to ~220 mph) and seismic performance. Non-combustible, mold-resistant, and pest-resistant assemblies.",
  },
  {
    icon: Wind,
    title: "Reduced Site Labor",
    description: "Panelized components arrive ready to install, minimizing on-site labor requirements and schedule risk.",
  },
  {
    icon: Leaf,
    title: "Minimal Waste",
    description: "Offsite manufacturing precision dramatically reduces jobsite waste and improves overall sustainability.",
  },
  {
    icon: Building2,
    title: "Mid-Rise Capable",
    description: "Load-bearing wall systems capable of mid-rise applications across a wide range of building types.",
  },
];

const techSpecs = [
  { label: "System Type", value: "Light Gauge Steel Structural Insulated Panels (SIPs)" },
  { label: "Insulation Core", value: "Integrated EPS (Expanded Polystyrene)" },
  { label: "R-Value Range", value: "Approx. R-28 to R-61" },
  { label: "Panel Thickness", value: '3.5" to 7.5"+' },
  { label: "Wind Resistance", value: "Engineered up to ~220 mph" },
  { label: "Structural Capability", value: "Load-bearing, mid-rise applications" },
  { label: "Fire Classification", value: "Non-combustible assemblies" },
  { label: "Exterior Compatibility", value: "Stucco, cladding systems, and more" },
];

const applications = [
  "Multifamily residential",
  "Commercial buildings",
  "Institutional facilities",
  "Military and secure environments (SCIF)",
  "Industrial and warehouse structures",
];

const SolutionsThermaSteel = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
              L2L Systems
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6">
              Vertical Construction Solutions
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              L2L Systems delivers advanced panelized building solutions designed to transform
              conventional construction into a faster, more efficient, and higher-performance
              process. Leveraging proven ThermaSteel technology, our systems integrate structure,
              insulation, sheathing, and vapor control into a single engineered panel solution.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Request Information</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://thermasteelwest.com/" target="_blank" rel="noopener noreferrer">
                  ThermaSteel Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Key Benefits</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-center">
            Why developers, builders, and institutions choose L2L Systems for their next project.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-foreground mb-10 text-center">Technical Overview</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden max-w-3xl mx-auto">
            {techSpecs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-start gap-4 px-6 py-4 ${i < techSpecs.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="text-muted-foreground w-48 flex-shrink-0 text-sm">{spec.label}</span>
                <span className="text-foreground text-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4 text-center md:text-left">Applications</h2>
              <p className="text-muted-foreground mb-6">
                L2L Systems panels are engineered for a wide range of building types and environments:
              </p>
              <ul className="space-y-3">
                {applications.map((app) => (
                  <li key={app} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
              <h3 className="font-semibold text-foreground mb-3">Powered by ThermaSteel</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                L2L Systems is built on the proven ThermaSteel panel platform — a light gauge steel
                structural insulated panel technology with a track record across North America and
                global markets.
              </p>
              <a
                href="https://thermasteelwest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                Learn more at thermasteelwest.com <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Build with L2L Systems?
            </h2>
            <p className="text-muted-foreground mb-6">
              Contact our team to discuss how L2L Systems can deliver speed, performance, and
              certainty on your next project.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SolutionsThermaSteel;
