import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-foreground">
                L2L <span className="text-primary">United</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              A leading company specializing in innovative 
              building technologies and sustainable housing solutions worldwide.
            </p>
            <div className="flex flex-col space-y-3">
              <a 
                href="mailto:info@l2lunited.com" 
                className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span>info@l2lunited.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} L2L United. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
