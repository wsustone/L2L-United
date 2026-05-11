import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Building2, ArrowRight, Clock, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const Solutions = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
              Integrated Building Solutions
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              L2L United delivers a suite of specialized solutions — each backed by proven
              technology and designed to work together across the full building lifecycle.
            </p>
          </div>
        </div>
      </section>

      {/* L2L Systems Snapshot */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Building2 className="text-primary" size={24} />
                </div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  L2L Systems
                </span>
                <h2 className="text-2xl font-bold text-foreground mt-2 mb-3">
                  Vertical Construction Solutions
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Advanced panelized building solutions leveraging proven ThermaSteel technology —
                  integrating structure, insulation, sheathing, and vapor control into a single
                  engineered panel system.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["30–50% Faster Build", "R-28 to R-61 Insulation", "~220 mph Wind Rated", "Non-Combustible"].map((f) => (
                    <span key={f} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                      {f}
                    </span>
                  ))}
                </div>
                <Button asChild>
                  <Link to="/solutions/l2lsystems">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="bg-secondary/40 p-10 flex flex-col justify-center gap-6">
                {[
                  { icon: Clock, title: "30–50% Faster Construction", body: "Precision offsite manufacturing eliminates jobsite delays." },
                  { icon: Zap, title: "Superior Energy Performance", body: "Integrated EPS core insulation from R-28 to R-61." },
                  { icon: Shield, title: "Resilient by Design", body: "Engineered for high wind, seismic, fire, and mold resistance." },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="text-primary" size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-muted-foreground text-sm">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6">
              Contact our team to discuss how L2L United's solutions can meet your needs.
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

export default Solutions;
