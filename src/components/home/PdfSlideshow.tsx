import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfSlideshowProps {
  src: string;
}

const PdfSlideshow = ({ src }: PdfSlideshowProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  }, []);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentPage((p) => (p >= numPages ? 1 : p + 1));
    }, 6000);
  }, [numPages]);

  useEffect(() => {
    if (numPages > 1) startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [numPages, startAutoPlay]);

  // On manual nav: pause auto-advance, resume after 2 minutes
  const handleManualNav = (navigate: () => void) => {
    navigate();
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(startAutoPlay, 2 * 60 * 1000);
  };

  const goToPrev = () => handleManualNav(() => setCurrentPage((p) => Math.max(1, p - 1)));
  const goToNext = () => handleManualNav(() => setCurrentPage((p) => Math.min(numPages, p + 1)));
  const zoomIn = () => setScale((s) => Math.min(2.0, +(s + 0.25).toFixed(2)));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.25).toFixed(2)));

  return (
    <div className="flex flex-col items-center gap-4">
      {/* PDF canvas */}
      <div className="w-full overflow-auto rounded-xl border border-border bg-muted flex justify-center">
        <Document
          file={src}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              Loading…
            </div>
          }
          error={
            <div className="flex items-center justify-center h-64 text-destructive">
              Failed to load PDF.
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* Controls */}
      {numPages > 0 && (
        <div className="flex items-center gap-4">
          {/* Prev / page counter / Next */}
          <button
            type="button"
            onClick={goToPrev}
            disabled={currentPage <= 1}
            aria-label="Previous slide"
            className="bg-card border border-border hover:border-primary text-foreground rounded-full p-2 transition-colors disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="text-sm text-muted-foreground min-w-[6rem] text-center">
            {currentPage} / {numPages}
          </span>

          <button
            type="button"
            onClick={goToNext}
            disabled={currentPage >= numPages}
            aria-label="Next slide"
            className="bg-card border border-border hover:border-primary text-foreground rounded-full p-2 transition-colors disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>

          {/* Zoom */}
          <div className="flex items-center gap-2 ml-4">
            <button
              type="button"
              onClick={zoomOut}
              disabled={scale <= 0.5}
              aria-label="Zoom out"
              className="bg-card border border-border hover:border-primary text-foreground rounded-full p-2 transition-colors disabled:opacity-30"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm text-muted-foreground w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={scale >= 2.0}
              aria-label="Zoom in"
              className="bg-card border border-border hover:border-primary text-foreground rounded-full p-2 transition-colors disabled:opacity-30"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfSlideshow;
