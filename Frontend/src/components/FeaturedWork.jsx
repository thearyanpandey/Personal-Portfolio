import { useEffect, useRef } from "react";

export default function FeaturedWork() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollContent = scrollContainer.firstChild;
      //console.log("scrollContent : -> ", scrollContent);
      const scrollWidth = scrollContent.scrollWidth;
      //console.log("scrollWidth : -> ", scrollWidth);
      let scrollPosition = 0;

      const scroll = () => {
        scrollPosition += 1;
        if (scrollPosition >= scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
        requestAnimationFrame(scroll);
      };

      requestAnimationFrame(scroll);
    }
  }, []);

  return (
    <div className="bg-gray-900 p-4 shadow-lg rounded-2xl overflow-hidden">
      <div ref={scrollRef} className="overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          <span className="inline-block px-4 text-xs font-semibold text-white">
            WORK AND FEATURED
          </span>
          <span className="inline-block px-4 text-xs text-gray-400">
            • LATEST WORK AND FEATURED
          </span>
        </div>
      </div>
    </div>
  );
}
