import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import VideoShowcase from "@/components/home/VideoShowcase";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <VideoShowcase />
      <CTASection />
    </Layout>
  );
};

export default Index;
