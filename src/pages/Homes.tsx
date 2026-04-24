import { useRef, useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Ruler, Zap, Shield, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const sliderImages = [
  { src: "/images/l2l-homes/image-65eb98377efb9.webp",      alt: "Modern concrete home with wood and glass paneling" },
  { src: "/images/l2l-homes/image-1-65eb98353f2ef.webp",    alt: "Concrete cottage home" },
  { src: "/images/l2l-homes/image-2-65eb9834e1918.webp",    alt: "Concrete home with stone accented exterior and patio" },
  { src: "/images/l2l-homes/image-3-65eb9833b9132.webp",    alt: "Two story concrete home with modern wood paneling" },
  { src: "/images/l2l-homes/image-4-65eb9833a4696.webp",    alt: "Rendering of modern concrete home with rooftop patio" },
  { src: "/images/l2l-homes/image-5-65eb98321977a.webp",    alt: "Modern concrete home with grass roof" },
  { src: "/images/l2l-homes/image-6-65eb9831c3a72.webp",    alt: "Modern concrete home with grass roof" },
  { src: "/images/l2l-homes/image-7-65eb9830c30d5.webp",    alt: "Modern concrete home with white exterior and large glass windows" },
  { src: "/images/l2l-homes/image-8-65eb9830359b8.webp",    alt: "Modern concrete home with white exterior and large glass windows" },
  { src: "/images/l2l-homes/image-9-65eb982f865a0.webp",    alt: "Manufactured concrete office space in backyard" },
  { src: "/images/l2l-homes/image-10-65eb982f064e4.webp",   alt: "Modern ranch style concrete home" },
  { src: "/images/l2l-homes/image-11-65eb982d59e97.webp",   alt: "Three story concrete home" },
  { src: "/images/l2l-homes/image-12-65eb982cf3219.webp",   alt: "Modern concrete home with wood and glass paneling" },
  { src: "/images/l2l-homes/image-13-65eb982c0748a.webp",   alt: "Concrete home with smooth white exterior" },
  { src: "/images/l2l-homes/image-14-65eb982be408f.webp",   alt: "Modern concrete home with 2 car garage" },
];

const Homes = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Hero video autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    const handleInteraction = () => {
      video.muted = true;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    };
    window.addEventListener("pointerdown", handleInteraction, { once: true });
    return () => window.removeEventListener("pointerdown", handleInteraction);
  }, []);

  const handleToggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = true;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Image slider autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((c) => (c + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => setActiveSlide((c) => (c - 1 + sliderImages.length) % sliderImages.length);
  const goToNext = () => setActiveSlide((c) => (c + 1) % sliderImages.length);

  return (
    <Layout>
      {/* Hero Video */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a1a2e]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/Video_30SEG-1-poster-00001.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/Video_30SEG-1-transcode.mp4" type="video/mp4" />
        </video>

        <div className="container mx-auto px-6 relative z-10 pt-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">L2L Homes</h1>
            <p className="text-xl text-white/90">
              Fire resistant, climate resilient, and energy efficient homes.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleVideo}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute bottom-6 right-6 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-3 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </section>

      {/* About Intro — SiteBuilt §1 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-lg text-foreground leading-relaxed">
            L2L Homes provides a highly skilled team that will assist you in designing a customized
            floor plan to suit your lifestyle.
          </p>
        </div>
      </section>

      {/* About L2L Homes — SiteBuilt §2 */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <img
              src="/images/l2l-homes/img-5429-6596e660dc7d1.webp"
              srcSet="/images/l2l-homes/img-5429-6596e660dc7d1-p-500.webp 500w, /images/l2l-homes/img-5429-6596e660dc7d1-p-800.webp 800w, /images/l2l-homes/img-5429-6596e660dc7d1.webp 828w"
              sizes="(max-width: 767px) 96vw, 38vw"
              alt="3 story concrete home"
              loading="lazy"
              className="w-full rounded-lg object-cover"
            />
            <div>
              <h2 className="text-3xl font-bold text-[#1a3a5c] mb-6">About L2L Homes</h2>

              <div className="mb-6">
                <p className="font-semibold text-foreground mb-2">Built to Help Withstand:</p>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Fires</li>
                  <li>Flooding</li>
                  <li>Tornadoes</li>
                  <li>Hurricanes</li>
                  <li>Earthquakes</li>
                  <li>Blizzards / Heavy Snow</li>
                  <li>Extreme Climate Events</li>
                </ul>
              </div>

              <div className="mb-8">
                <p className="font-semibold text-foreground mb-2">Key Components:</p>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Fire Resistant and Climate Resilient</li>
                  <li>Hurricane Wind Tested to 225 mph</li>
                  <li>Rapid On-Site Installation</li>
                  <li>Zero Rot &amp; Termite Resistant</li>
                  <li>Mold Free Sustainable Living</li>
                  <li>Healthy Homes = Cleaner Breathing</li>
                  <li>16 ft Ceilings and Multiple Floorplans</li>
                  <li>Rooftop Decks with Garden / Fire Pits</li>
                  <li>Solar and Energy Storage Capabilities</li>
                  <li>Better Insurability and Faster ROI</li>
                </ul>
              </div>

              <Button asChild variant="outline">
                <Link to="/contact">Let&apos;s Connect</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <Zap className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Energy Efficient</h3>
                <p className="text-muted-foreground">
                  R-40+ insulation rating means lower energy bills and year-round comfort.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Disaster Resistant</h3>
                <p className="text-muted-foreground">
                  Engineered to withstand Category 5 hurricanes and seismic activity.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Ruler className="h-10 w-10 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Quick Assembly</h3>
                <p className="text-muted-foreground">
                  Modular design allows for 60% faster construction than traditional methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Models — image slider */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">
            Available Models
          </h2>

          <div className="relative">
            {/* Slide */}
            <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-[#0a1a2e]">
              {sliderImages.map((img, i) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${
                    i === activeSlide ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous model"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1a3a5c] rounded-full p-2 shadow transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next model"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1a3a5c] rounded-full p-2 shadow transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {sliderImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === activeSlide ? "bg-[#1a3a5c]" : "bg-[#1a3a5c]/30"
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <p className="text-center text-sm text-muted-foreground mt-3">
              {activeSlide + 1} / {sliderImages.length}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="bg-[hsl(222,47%,15%)] rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your Dream Home?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Contact our team to discuss your project requirements and learn how L2L Homes
              can provide the perfect solution for your housing needs.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Homes;
