const videos = [
  {
    id: "video-thermasteel",
    title: "L2L Systems",
    description: "See how ThermaSteel's insulated panel systems revolutionize construction with speed, strength, and energy efficiency.",
    videoSrc: "/videos/v8.mp4",
  },
  {
    id: "video-ustucco",
    title: "L2L Supply",
    description: "Discover UStucco's innovative exterior finishing solutions for durable, beautiful building facades.",
    videoSrc: "/videos/stucco.mp4#t=58",
  },
  {
    id: "video-biopure",
    title: "L2L Solutions",
    description: "Learn about Bio-Pure's advanced waste-water treatment systems for residential and commercial applications.",
    comingSoon: true,
  },
];

const VideoShowcase = () => {
  return (
    <section className="pt-16 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
          Our <span className="text-primary">Solutions</span> in Action
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Watch how our products transform construction and infrastructure projects worldwide.
        </p>

        <div className="space-y-20">
          {videos.map((video) => (
            <div key={video.id} id={video.id} className="scroll-mt-24">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-2">{video.title}</h3>
                <p className="text-muted-foreground mb-6">{video.description}</p>
                {video.comingSoon ? (
                  <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                    <p className="text-2xl font-semibold text-muted-foreground">Coming Soon</p>
                  </div>
                ) : (
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <video
                      className="w-full h-full"
                      controls
                      preload="metadata"
                    >
                      <source src={video.videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
