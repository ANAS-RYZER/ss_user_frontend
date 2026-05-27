"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  
];

export default function Carousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000 })]
  );


  return (
    <div className="overflow-hidden rounded-xl" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <div className="min-w-full" key={index}>
          <Image
  src={src}
  alt="banner"
  width={1000}
  height={700}
  quality={75}
  priority
  className="w-full h-[500px] object-cover object-top"
/>
          </div>
        ))}
      </div>
    </div>
  );
}