import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="text-muted-foreground hover:text-primary transition-colors">
                  Leadership Team
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">
                  News & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/homes" className="text-muted-foreground hover:text-primary transition-colors">
                  L2L Homes
                </Link>
              </li>
              <li>
                <Link to="/solutions/thermasteel" className="text-muted-foreground hover:text-primary transition-colors">
                  ThermaSteel Systems
                </Link>
              </li>
              <li>
                <Link to="/solutions/bio-pure" className="text-muted-foreground hover:text-primary transition-colors">
                  Bio-Pure Water
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  Building Products
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} L2L United. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
            <Link to="/auth" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
