import Layout from "@/components/layout/Layout";
import { Construction } from "lucide-react";

const UnderConstruction = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-24 px-6">
        <Construction className="h-16 w-16 text-primary mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Under Construction
        </h1>
        <p className="text-lg text-muted-foreground text-center max-w-md">
          L2L United Global Living Solutions is working on something great. Check back soon!
        </p>
      </div>
    </Layout>
  );
};

export default UnderConstruction;
