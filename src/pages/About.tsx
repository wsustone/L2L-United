import Layout from "@/components/layout/Layout";
import { Target, Eye, Link, Zap, Shield, DollarSign, Layers, MapPin } from "lucide-react";

const divisions = [
  { name: "L2L Systems by ThermaSteel West", description: "Advanced panelized building systems" },
  { name: "L2L Supply", description: "Material sourcing and procurement" },
  { name: "L2L Installation", description: "Field execution and installation crews" },
  { name: "L2L Logistics", description: "Freight, coordination, and delivery optimization" },
  { name: "L2L A&E", description: "Architecture and engineering integration" },
  { name: "L2L Homes", description: "Development and construction platform" },
  { name: "L2L Funding Group", description: "Project financing and investor partnerships" },
];

const markets = [
  "Multifamily and residential developments",
  "Commercial and industrial buildings",
  "Military and secure infrastructure",
  "Hospitality and resort developments",
  "Remote and climate-sensitive environments",
];

const approach = [
  {
    step: "1",
    title: "Design Integration",
    description: "We align architectural intent with engineered systems from day one.",
  },
  {
    step: "2",
    title: "Offsite Manufacturing",
    description: "Precision-built components reduce site labor, waste, and schedule risk.",
  },
  {
    step: "3",
    title: "Logistics & Deployment",
    description: "Coordinated delivery and installation ensure predictable execution.",
  },
  {
    step: "4",
    title: "Field Installation",
    description: "Experienced crews deliver efficient, repeatable builds at scale.",
  },
];

const whyL2L = [
  {
    icon: Link,
    title: "Vertically Integrated",
    description: "One partner from design through installation—no disconnects.",
  },
  {
    icon: Zap,
    title: "Speed to Market",
    description: "Reduced timelines through prefabrication and systemized construction.",
  },
  {
    icon: Shield,
    title: "Resilient by Design",
    description: "Engineered for extreme environments including hurricanes, wildfires, and seismic zones.",
  },
  {
    icon: DollarSign,
    title: "Cost Certainty",
    description: "Controlled supply chain and standardized systems reduce volatility.",
  },
  {
    icon: Layers,
    title: "Scalable Solutions",
    description: "From single-family homes to large-scale developments.",
  },
];

const regions = [
  "United States",
  "Canada",
  "Caribbean",
  "Pacific regions (including Hawaii and Guam)",
  "International project markets",
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Building the Future of Resilient, Scalable Construction
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-muted-foreground mb-4">
                We specialize in delivering high-performance building envelopes and structural
                systems across a wide range of markets:
              </p>
              <ul className="space-y-3">
                {markets.map((m) => (
                  <li key={m} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground mb-4">
                Our systems are designed to outperform conventional construction in:
              </p>
              <ul className="space-y-3">
                {[
                  "Speed of construction",
                  "Thermal performance",
                  "Structural resilience (wind, seismic, fire)",
                  "Material efficiency and waste reduction",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To lead the transformation of the construction industry by replacing outdated,
                inefficient building methods with industrialized, high-performance systems that are
                faster, stronger, and more sustainable.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-7 w-7 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To deliver innovative building solutions that enable developers, governments, and
                communities to build smarter—without compromising on quality, performance, or speed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Approach</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Traditional construction is fragmented. We've rebuilt it into a connected,
              streamlined process.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((item) => (
              <div key={item.step} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why L2L */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why L2L</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyL2L.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-card border border-border rounded-xl p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

     

 {/* Who We Are / Divisions */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Who We Are</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              L2L United is the parent organization behind a network of specialized companies
              working together as one unified system:
            </p>
            <ul className="space-y-3 mb-8">
              {divisions.map((div) => (
                <li key={div.name} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{div.name}</span> – {div.description}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              This structure allows us to control every stage of the building lifecycle—eliminating
              inefficiencies, reducing risk, and delivering consistent results.
            </p>
          </div>
        </div>
      </section>
      {/* Where We Work */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="h-7 w-7 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Where We Work</h2>
            </div>
            <p className="text-muted-foreground mb-6">L2L United operates across:</p>
            <ul className="space-y-3">
              {regions.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Let's Build What's Next</h2>
            <p className="text-muted-foreground mb-6">
              We partner with developers, builders, and institutions to deliver projects that demand
              more—more performance, more efficiency, and more certainty.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
