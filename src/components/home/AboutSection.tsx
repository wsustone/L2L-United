import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    "End-to-end project management",
    "Licensed and bonded professionals",
    "Sustainable building practices",
    "On-time and on-budget delivery",
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              A Trusted Partner in Development Solutions
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              L2L United is a premier development solutions company specializing in 
              ground-up construction and utilities infrastructure. With decades of 
              combined experience, our team brings expertise, innovation, and 
              dedication to every project we undertake.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We understand that successful development requires more than just 
              construction—it demands strategic planning, meticulous execution, 
              and a commitment to long-term value creation. That's why we partner 
              with our clients from initial concept through final delivery.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary">L2L</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Building Excellence
                  </p>
                  <p className="text-muted-foreground">Since 1999</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
