import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Homepage", path: "/" },
  { label: "About", path: "/about" },
  { label: "Investment Opportunities", path: "/investment" },
  { label: "L2L Homes", path: "/homes" },
  { label: "Global Building Solutions", path: "/solutions" },
  { label: "News & Insights", path: "/news" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/images/L2LLogo_noText.JPG" 
              alt="L2L UNITED Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="text-xl md:text-2xl font-bold text-[#1a3a5c]">
              L2L <span className="text-[#1a3a5c]">UNITED</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#1a3a5c] ${
                  location.pathname === item.path ||
                  (item.path !== "/" && location.pathname.startsWith(item.path))
                    ? "text-[#1a3a5c]"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="bg-[#1a3a5c] hover:bg-[#152d4a]">
              <Link to="/contact">Contact</Link>
            </Button>
            <Link
              to="/portal"
              className="text-xs font-medium text-muted-foreground/60 hover:text-primary transition-colors border border-border rounded-md px-2.5 py-1.5"
            >
              Staff Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-3 border-t border-border max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-medium transition-colors hover:text-[#1a3a5c] hover:bg-[#1a3a5c]/5 rounded-lg mx-2 ${
                    location.pathname === item.path ||
                    (item.path !== "/" && location.pathname.startsWith(item.path))
                      ? "text-[#1a3a5c] bg-[#1a3a5c]/5"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-2 pt-2 flex flex-col gap-2">
                <Button asChild size="sm" className="w-full bg-[#1a3a5c] hover:bg-[#152d4a]">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Contact
                  </Link>
                </Button>
                <Link
                  to="/portal"
                  onClick={() => setIsOpen(false)}
                  className="text-xs font-medium text-center text-muted-foreground/60 hover:text-[#1a3a5c] transition-colors border border-border rounded-md px-3 py-2"
                >
                  Staff Portal
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
