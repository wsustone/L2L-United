import Layout from "@/components/layout/Layout";
import { Target, Eye, Heart, Users } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About L2L United
            </h1>
            <p className="text-xl text-muted-foreground">
              Transforming global housing through innovative, sustainable building solutions
              that empower communities and create lasting value.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                L2L United is dedicated to revolutionizing the construction industry by providing
                innovative, affordable, and sustainable building solutions to communities worldwide.
                We believe everyone deserves access to quality housing that is both durable and
                environmentally responsible.
              </p>
              <p className="text-muted-foreground">
                Through our proprietary ThermaSteel panel technology and strategic partnerships,
                we're making it possible to build better homes faster, while reducing environmental
                impact and construction costs.
              </p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-8">
              <blockquote className="text-lg italic text-foreground">
                "We're not just building homes—we're building communities, creating opportunities,
                and establishing a new standard for sustainable construction worldwide."
              </blockquote>
              <p className="mt-4 text-primary font-semibold">— L2L United Leadership</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">By 2030, we aim to:</h3>
              <ul className="space-y-3">
                {[
                  "Provide affordable housing solutions in 50+ countries",
                  "Reduce construction time by 60% compared to traditional methods",
                  "Achieve carbon neutrality in all manufacturing processes",
                  "Create 10,000+ jobs in emerging markets",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                We envision a world where quality housing is accessible to everyone, regardless of
                location or economic status. Our goal is to be the global leader in sustainable
                building solutions, setting the standard for innovation, efficiency, and environmental
                responsibility in construction.
              </p>
              <p className="text-muted-foreground">
                Through continuous innovation and strategic expansion, we're working to make this
                vision a reality, one community at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Our Core Values</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every project we undertake.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                body: "We constantly push boundaries to develop better, more efficient building solutions that address real-world challenges.",
              },
              {
                title: "Sustainability",
                body: "Environmental responsibility is at the heart of everything we do, from material sourcing to manufacturing processes.",
              },
              {
                title: "Community",
                body: "We're committed to empowering communities by creating jobs, transferring knowledge, and building lasting partnerships.",
              },
            ].map((v) => (
              <div key={v.title} className="bg-card rounded-lg p-6 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="team" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Leadership Team</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experienced leadership team brings decades of expertise in construction,
              technology, and global development.
            </p>
          </div>

          {/* Team cards — replace each object with real name, title, bio, and image path */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              // { name: "Full Name", title: "Title", bio: "Bio text here.", image: "/images/team/name.jpg" },
            ].map((member) => (
              <div key={member.name} className="bg-card rounded-lg p-6 border border-border text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-3">{member.title}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Remove this block once team members are added above */}
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
            Team information coming soon.
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
