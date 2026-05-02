import Layout from "@/components/layout/Layout";
import { Mail, Building2, Truck, Wrench, BarChart3, ArrowRight } from "lucide-react";


const Contact = () => {
  return (
    <Layout>
        {/* Email CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card border border-border rounded-2xl p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="text-primary" size={26} />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Send Us an Email</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our team reviews every inquiry and responds within one business day. Tell us about
                your project, your timeline, and what you're trying to build.
              </p>
              <a
                href="mailto:info@l2lunited.com"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-8 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                info@l2lunited.com
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Response Expectations */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">What to Expect</h2>
            <div className="space-y-4">
              {[
                { step: "1", text: "Send us a brief description of your project or question." },
                { step: "2", text: "Our team will review your inquiry and route it to the right specialist." },
                { step: "3", text: "You'll hear back with next steps or a meeting request." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary font-bold text-sm">{item.step}</span>
                  </div>
                  <p className="text-muted-foreground pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
