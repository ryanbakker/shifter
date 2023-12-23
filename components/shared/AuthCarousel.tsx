"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { showcaseImages } from "@/constants";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";

Autoplay.globalOptions = { delay: 7000 };

function AuthCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);

  return (
    <div
      ref={emblaRef}
      className="overflow-hidden cursor-pointer min-h-screen flex items-center justify-center md:max-w-[50%] bg-white"
    >
      <div className="flex">
        {showcaseImages.map((image) => (
          <div key={image.id} className="relative flex-full min-w-0">
            <Image
              src={`/assets/images/cars/${image.path}`}
              alt={image.name}
              width={1000}
              height={1000}
              className="object-cover object-center"
            />

            <div className="absolute -bottom-10 left-3 flex space-x-1 bg-white py-1 px-3 rounded-md items-center hover:bg-slate-200 transition-all z-20">
              <User size={15} />
              <Link
                href={image.attributePath}
                className="font-light text-xs"
                title="Check out the artist"
              >
                {image.attributeName}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthCarousel;
