import { Target, Lightbulb, Handshake, TrendingUp } from "lucide-react";

const approaches = [
  {
    icon: Target,
    title: "Strategic Planning",
    description:
      "We begin every project with comprehensive analysis and strategic planning to ensure alignment with your objectives and market conditions.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description:
      "Our team leverages cutting-edge technologies and methodologies to deliver efficient, sustainable, and cost-effective solutions.",
  },
  {
    icon: Handshake,
    title: "Collaborative Partnership",
    description:
      "We work closely with clients, stakeholders, and communities to ensure transparency, communication, and shared success.",
  },
  {
    icon: TrendingUp,
    title: "Value Creation",
    description:
      "Every decision is guided by our commitment to maximizing long-term value for our clients and the communities we serve.",
  },
];

const ApproachSection = () => {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wider">
            Our Approach
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-3 md:mt-4 mb-4 md:mb-6">
            How We Deliver Results
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Our proven methodology combines strategic insight with operational 
            excellence to consistently deliver projects that exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {approaches.map((approach, index) => (
            <div
              key={approach.title}
              className="group p-5 md:p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                <approach.icon className="text-primary" size={24} />
              </div>
              <div className="text-xs md:text-sm font-semibold text-primary mb-1 md:mb-2">
                0{index + 1}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                {approach.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {approach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
